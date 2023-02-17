# Detail

## GitHub branch protection rule

- [Managing a branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule)

You should protect the default branch by GitHub branch protection rule.
At least, the following settings should be enabled.

- `Require a pull request before merging`
- `Require status checks to pass before merging`
  - `Status checks that are required.`: `status-check`

The meaning of these settings is simple, **changes of the default branch must be tested**.

`Status checks that are required.` is an essential setting.
You can't merge a pull request whose `required jobs` fail,
but in other words you can merge a pull request even if jobs other than `required jobs` fail. This is undesirable.

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

If a workflow is run only when specific files are changed, you can't add the workflow's jobs to `Status checks that are required.`, so even if the workflow fails you can merge a pull request. This is undesirable.

To solve the issue, you should merge the workflow to one workflow which is always triggered and add jobs to `status-check` job's `needes`. And to run jobs only when specific files are changed, you should use [dorny/paths-filter](https://github.com/dorny/paths-filter) or similar action.

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

There are two exceptions of `one workflow`.

1. `actionlint`: A workflow to run [actionlint](https://github.com/rhysd/actionlint)

actionlint should be run in a dedicated workflow because if the workflow gets invalid actionlint isn't run and you can't find the issue.

2. Workflows using [GitHub Actions Environment's Deployment branch](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#deployment-branches)

## Continuous dependency update by Renovate

It is important to keep dependencies up-to-date.
If you don't update dependencies continuously, you would have the following issues.

- You can't take any support from maintainers
- You can't use new features
- The behaviour of a old tool is different from the latest document
- If you do a big update including a lot of changes, it is hard to check Release Notes, verify the update, solve the upgrading issues, and detect the root cause when any problem occurs after upgrading
- The frequency of big updates is lower than the frequency of continuous updates, so it is difficult to keep the knowledge and improve the procedure

On the other hand, if you keep dependencies up-to-date, you can solve the above issues.

Renovate enables the continuous updates.
Renovate supports various managers and datasources and flexible settings.
You don't have to update dependencies manually.

Renovate is awesome and can be introduced easily, but it isn't enough to just install Renovate.
To utilize Renovate fully, you should not only tune Renovate settings but also configure GitHub Repository settings properly and tune GitHub Actions Workflows in accordance with Renovate.

## Merge pull requests automatically

Renovate would create many pull requests every day.
It would be hard to review and merge all of them manually.
You would be exhausted and frustrated, and finally pull requests would tend to be left.

To solve the problem, you should merge pull requests from Renovate automatically.
The burden of handling pull requests from Renovate would decrease and you would be able to focus on more essential tasks.

## Exclude risky updates from automerge

Some updates should be excluded from automerge.
For example, major updates should be excluded from automerge basically (If you know the major update is safe, you would be able merge pull requests automatically).
Renovate can enable or disable the automerge flexibly.

## GitHub auto-merge feature

- [Automatically merging a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)

To merge a pull request safely, you should enable GitHub auto-merge.
To use this feature, you have to configure the branch protection rule described above.
Renovate supports the automerge, but using GitHub native auto-merge feature you can merge pull requests more quickly.

## Test dependency updates by CI

You should fix GitHub Actions Workflows to test dependency updates.
Otherwise, you would miss bugs.
Probably you already test updates your application depends on directly, but maybe you don't test updates workflows depend on.

For example, when a tool for document generation is updated, the tool should be run in CI, and the document should be updated automatically or CI should fail if the document is changed.

Automerge consists of CI's reliability. It is mandatory to test dependency updates by CI in order to enable automerge.

## For team development

If you maintain a repository with other team members, which means multiple users have the write permission, some additional settings are required.

### Branch protection rules of the default branch

- `main`
  - `Require a pull request before merging`
    - `Require approvals` (1 approval)
    - `Dismiss stale pull request approvals when new commits are pushed`
    - `Require review from Code Owners`
    - `Require approval of the most recent reviewable push`

This settings means **a pull request must be reviewed by at least one Code Owner**.

### Branch protection rules of Renovate branches

You should create a branch protection rule of Renovate's branches `renovate/*`.

- `renovate/*` 
  - `Do not allow bypassing the above settings`
  - `Restrict who can push to matching branches`
    - `Restrict pushes that create matching branches`
      - `renovate`
      - Dedicated GitHub App
  - `Allow deletions`

You should forbid developers to push a commit to Renovate branches.
Otherwise, developers can push malicious code to a pull request of Renovate and can approve and merge the pull request.

Sometimes you would like to push a commit to a Renovate pull request automatically.
For example, you would like to update a autogenerated document.
In that case, you should create a dedicated GitHub App for it.
The GitHub App must be dedicated and be able to be used only in the workflow triggered by a pull request from Renovate.
Otherwise, developers can push a malicious code to a Renovate pull request using the GitHub App.

GitHub App's private key must be managed with [GitHub Environment's Deployment branches and Environment secrets](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment).

If you use GitHub Environment's Deployment branches, you have to create a GitHub Actions Workflow for it.
We call this workflow `renovate` workflow.

e.g.

```yaml
name: renovate
on:
  push:
    branches:
      - "renovate/**"
jobs:
  get-pr:
    # Get data regarding a pull request associated with the current commit.
    # This is used to approve the pull request and enable automerge.
    runs-on: ubuntu-latest
    outputs:
      found: ${{steps.pr.outputs.pr_found}}
      # Check if Renovate's automerge is enabled
      automerge: "${{contains(steps.pr.outputs.pr_body, ' **Automerge**: Enabled.')}}"
      number: ${{steps.pr.outputs.number}}
    permissions: {}
    steps:
      - uses: 8BitJonny/gh-get-current-pr@2.2.0
        id: pr

  update-aqua-checksums-renovate:
    runs-on: ubuntu-latest
    environment: renovate # Use GitHub Environment secrets
    # ...
```

To filter the workflow by pull request's head branch, you have to use `push` event instead of `pull_request` event.
And to get the pull request information on `push` event you have to use [8BitJonny/gh-get-current-pr](https://github.com/8BitJonny/gh-get-current-pr) or similar action.

As I mentioned above, jobs of `renovate` workflow can't be added to `Status checks that are required.`, so even if this workflow fails a pull request could be merged.
To prevent a pull request that `renovate` workflow fails from being merged automatically, 

