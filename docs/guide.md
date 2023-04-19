---
sidebar_position: 200
---

# Guide

## Create a GitHub branch protection rule of the default branch

- [Managing a branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule)

You should protect the default branch by GitHub branch protection rule.
At least, the following settings should be enabled.

- `Require a pull request before merging`
- `Require status checks to pass before merging`
  - `Status checks that are required.`: `status-check`

The meaning of these settings is simple, **changes of the default branch must be tested**.

## Create a GitHub Actions' dedicated job for status check

`Status checks that are required.` is an essential setting.
You can't merge a pull request whose `required jobs` fail,
but in other words you can merge a pull request even if jobs other than `required jobs` fail. This is undesirable.

If you add jobs to `Status checks that are required.`, it is inconvenient when you add a new job to the workflow and `Status checks that are required.` or change job names because until you merge a pull request to add a new job to the workflow you can't merge other pull requests.

Futhermore, if you don't have the permission to change GitHub Repository Settings and you have to ask someone to change them, it would be inconvenient.

So you should define a dedicated job and adding only the job to `Status checks that are required.`.
We call this job `status-check` job.

e.g.

```yaml
  status-check:
    # This job is used for main branch's branch protection rule's status check.
    # If all dependent jobs succeed or are skipped this job succeeds.
    runs-on: ubuntu-latest
    needs:
      - update-aqua-checksums
      - test
      - build
      - renovate-config-validator
      - ghalint
    permissions: {}
    if: failure()
    steps:
      - run: exit 1
```

:::caution
You can't merge `status-check` job and a job to enable auto-merge and approve a pull request.

<details>
<summary>Example</summary>

```yaml
  status-check:
    runs-on: ubuntu-latest
    needs:
      - update-aqua-checksums
      - test
      - renovate-config-validator
    permissions: {}
    if: |
      ! failure() && ! cancelled() && github.event.pull_request.user.login == 'renovate[bot]' && contains(github.event.pull_request.body, ' **Automerge**: Enabled.')
    steps:
      - name: Generate token
        id: generate_token
        uses: tibdex/github-app-token@021a2405c7f990db57f5eae5397423dcc554159c # v1
        with:
          app_id: ${{secrets.gh_app_id}}
          private_key: ${{secrets.gh_app_private_key}}
      - run: gh -R "$GITHUB_REPOSITORY" pr merge --merge --auto --delete-branch "$PR_NUMBER"
        env:
          GITHUB_TOKEN: ${{steps.generate_token.outputs.token}} # Use GitHub App to trigger GitHub Actions Workflow by merge commit.
          PR_NUMBER: ${{github.event.pull_request.number}}
      # ...
```

</details>

The issue of this example is that `status-check` is skipped when some of needs jobs fails so you can merge the pull request unexpectedly.
:::

## Merge GitHub Actions workflows for `pull_request` event to one workfklow for status check

If a workflow is run only when specific files are changed, you can't add the workflow's jobs to `Status checks that are required.`, so even if the workflow fails you can merge a pull request. This is undesirable.

To solve the issue, you should merge workflows for `pull_request` event to one workflow which is always triggered and add jobs to `status-check` job's `needes`. We call this workflow `one workflow`. And to run jobs only when specific files are changed, you should use [dorny/paths-filter](https://github.com/dorny/paths-filter) or similar action.

e.g.

```yaml
  path-filter:
    outputs:
      renovate-config-validator: ${{steps.changes.outputs.renovate-config-validator}}
    runs-on: ubuntu-latest
    steps:
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            renovate-config-validator:
              - renovate.json5

  renovate-config-validator:
    uses: suzuki-shunsuke/renovate-config-validator-workflow/.github/workflows/validate.yaml@v0.2.0
    needs: path-filter
    if: needs.path-filter.outputs.renovate-config-validator == 'true'
```

There are an exception of `one workflow`.

1. `actionlint`: A workflow to run [actionlint](https://github.com/rhysd/actionlint)

actionlint should be run in a dedicated workflow because if the workflow gets invalid actionlint isn't run and you can't find the issue.

If you want to trigger the workflow by not only `pull_request` event but also other events, please change the workflow to a Reusable Workflow and share the workflow with multiple workflows.

## Update dependencies continuously by Renovate

It is important to keep dependencies up-to-date.
If you don't update dependencies continuously, you would face the following issues.

- You can't take any support from maintainers
- You can't use new features
- The behaviour of a old tool is different from the latest document
- If you do a big update including a lot of changes, it is hard to check Release Notes, verify the update, solve the upgrading issues, and detect the root cause when any problem occurs after upgrading
- The frequency of big updates is lower than the frequency of continuous updates, so it is difficult to keep the knowledge and improve the procedure

On the other hand, if you keep dependencies up-to-date, you can solve the above issues.
Renovate enables the continuous updates.

Renovate is awesome and can be introduced easily, but it isn't enough to just install Renovate.
To utilize Renovate fully, you should not only tune Renovate settings but also configure GitHub Repository settings properly and tune GitHub Actions Workflows in accordance with Renovate.

## Merge pull requests automatically

Renovate would create many pull requests every day.
It would be hard to review and merge all of them manually.
You would be exhausted and frustrated, and finally pull requests would tend to be left.

To solve the problem, you should merge pull requests from Renovate automatically.
The burden of handling pull requests from Renovate would decrease and you would be able to focus on more essential tasks.

## Exclude risky updates from auto-merge

Some updates should not be merged automatically.
For example, normally major updates should not be merged automatically (If you know the major update is safe, you would be able merge pull requests automatically).
Renovate can enable or disable the auto-merge flexibly.

## Spread the target of auto-merge gradually

If you hesitate to enable auto-merge, you can also enable auto-merge against only specific packages.
After that, you would understand the benefit of auto-merge and would like to merge more pull requests automatically.
Then you can spread the target of auto-merge gradually.

## Test dependency updates by CI

Depency updates should be tested by CI.
Otherwise, you would miss bugs.
Probably you already test updates your application depends on directly, but maybe you don't test other updates.

For example, when a tool for document generation is updated, the tool should be run in CI, and the document should be updated automatically or CI should fail if the document is changed.

Automerge consists of CI's reliability. It is mandatory to test dependency updates by CI in order to enable auto-merge.

## Use GitHub auto-merge feature

- [Automatically merging a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)

To merge a pull request safely, you should enable GitHub auto-merge.
To use this feature, you have to configure the branch protection rule described above.
Renovate supports the auto-merge, but using GitHub native auto-merge feature you can merge pull requests more quickly.

## Enable auto-merge by GitHub Actions

Renovate supports [platformAutomerge](https://docs.renovatebot.com/configuration-options/#platformautomerge) enabling GitHub `auto-merge` automatically, but there are some issues.

- `platformAutomerge` works only when the pull request is initially created
- `platformAutomerge` enables auto-merge regardless the result of GitHub Actions Workflows

So you should enable auto-merge by GitHub Actions without platformAutomerge.

You should use GitHub App rather than `GITHUB_TOKEN` to enable auto-merge, because `GITHUB_TOKEN` doesn't trigger GitHub Actions Workflows.

https://docs.github.com/en/actions/security-guides/automatic-token-authentication#using-the-github_token-in-a-workflow

> When you use the repository's GITHUB_TOKEN to perform tasks, events triggered by the GITHUB_TOKEN, with the exception of workflow_dispatch and repository_dispatch, will not create a new workflow run.

Please see [Enable GitHub auto-merge in renovate workflow](#enable-github-auto-merge-in-renovate-workflow) too.

## For team development

If you maintain a repository with other team members, which means multiple developers have the write permission, some additional settings are required.

### Configure a branch protection rule of the default branch to enforce the review

- `Require a pull request before merging`
  - `Require approvals` (1 approval)
  - `Dismiss stale pull request approvals when new commits are pushed`
  - `Require review from Code Owners`
  - `Require approval of the most recent reviewable push`

This settings means **a pull request must be reviewed by at least one Code Owner**.

### Configure a branch protection rule of Renovate branches to forbid to add changes without the review

You should create a branch protection rule of Renovate's branches `renovate/*`.

- `renovate/*`
  - `Do not allow bypassing the above settings`
  - `Restrict who can push to matching branches`
    - `Restrict pushes that create matching branches`
      - `renovate`
      - Dedicated GitHub App
  - `Allow deletions`: To allow Renovate to delete branches
  - `Allow force pushes`: To allow Renovate to rebase branches
    - `Specify who can force push`
      - `renovate`

You should forbid developers to push a commit to Renovate branches.
Otherwise, developers can push malicious code to a pull request of Renovate and can approve and merge the pull request.
Even if `Require approval of the most recent reviewable push` is enabled, developers still can push malicious code.

If you want to add changes to a Renovate pull request, you should create a new pull request. You may feel bothersome, but you have no choice.

### Create a dedicated GitHub App to push commits to a Renovate pull request

Sometimes you would like to push a commit to a Renovate pull request automatically.
For example, you would like to update a autogenerated document.
In that case, you should create a dedicated GitHub App for it.
The GitHub App must be dedicated and be able to be used only in the workflow triggered by a pull request from Renovate.
Otherwise, developers can push a malicious code to a Renovate pull request using the GitHub App.

GitHub App's private key must be managed with [GitHub Environment's Deployment branches and Environment secrets](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment).

```yaml
  approve-and-enable-automerge-renovate:
    runs-on: ubuntu-latest
    environment: renovate
    if: |
      github.event.pull_request.user.login == 'renovate[bot]' && contains(github.event.pull_request.body, ' **Automerge**: Enabled.')
    steps:
      - name: Generate token
        id: generate_token
        uses: tibdex/github-app-token@021a2405c7f990db57f5eae5397423dcc554159c # v1
        with:
          app_id: ${{secrets.APP_ID}}
          private_key: ${{secrets.APP_PRIVATE_KEY}}
      - name: Enable auto-merge
        run: gh -R "$GITHUB_REPOSITORY" pr merge --merge --auto --delete-branch "$PR_NUMBER"
        env:
          # github.token is unavailable, because github.token doesn't have a permission to delete a branch `renovate/*`
          GITHUB_TOKEN: ${{steps.generate_token.outputs.token}}
          PR_NUMBER: ${{github.event.pull_request.number}}
      # https://github.com/cli/cli/issues/6680
      # HTTP 401: Personal access tokens with fine grained access do not support the GraphQL API (https://api.github.com/graphql)
      # - run: gh -R aquaproj/example-update-checksum pr review -a "$PR_NUMBER"
      - name: Approve a pull request
        run: |
          gh api \
            --method POST \
            -H "Accept: application/vnd.github+json" \
            "/repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER/reviews" \
            -f event='APPROVE'
        env:
          PR_NUMBER: ${{github.event.pull_request.number}}
          GITHUB_TOKEN: ${{secrets.GH_TOKEN_APPROVE_RENOVATE_PR}}
```

### (Optional) Update branch of Renovate pull request by comment

Developers can't update branch of Renovate pull requests due to the branch protection rule.
Renovate supports rebasing branch but sometimes you would like to update branch.
You can update branch of Renovate pull request by adding a GitHub Actions Workflow.
This workflow is triggered by pull request comment and updates branch by GitHub API.

[example workflow](https://github.com/aquaproj/example-update-checksum/blob/main/.github/workflows/update-branch.yaml)

![image](https://user-images.githubusercontent.com/13323303/220363572-3d56aedf-7a09-44b8-bb34-e946f74e5b7b.png)

We call this workflow `update-branch workflow`.
This workflow is optional because Renovate supports rebasing branch.

To use this workflow, you must allow the default branch to access GitHub App Private Key to push commits to Renovate branch because [issue_comment event](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#issue_comment) is triggered at the default branch.

### :bulb: Consider self-hosted runner to save money

As we mentioned above, you have to run some additional jobs.

- `status-check`
- `path-filter`
- `approve-and-enable-automerge-renovate`

But maybe you don't want to run these jobs to save the billing for GitHub Actions.

https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions

In that case, you should consider [self-hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners) because GitHub Actions usage is free for self-hosted runner.

## For public repository

If you maintain a repository yourself and only you have a write permission, the following things are unnecessary.

- a personal access token to approve a pull request
- a dedicated GitHub App to push commits to Renovate branches
- a GitHub Environment for Renovate
- a GitHub Actions Workflows for Renovate

### Support pull requests from fork repositories

GitHub Actions workflows should pass even if a pull request is sent from a fork repository.
A pull request from a fork repository can't access GitHub Secrets and `GITHUB_TOKEN` has only read permissions,
so steps requiring secrets or write permissions should be skipped or fixed.

Pull request from a fork repository:

```yaml
if: |
  github.event_name == 'pull_request' && github.event.pull_request.head.repo.fork
```

Other than pull request from a fork repository:

```yaml
if: |
  github.event_name != 'pull_request' || ! github.event.pull_request.head.repo.fork
```
