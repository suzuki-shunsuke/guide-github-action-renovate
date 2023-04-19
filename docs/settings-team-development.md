---
sidebar_position: 500
---

# Settings for Team Development

## Repository Setting

- Allow auto-merge

## Branch Protection Rules

- `main`
  - `Require a pull request before merging`
    - `Require approvals` (1 approval)
    - `Dismiss stale pull request approvals when new commits are pushed`
    - `Require review from Code Owners`
    - `Require approval of the most recent reviewable push`
  - `Require status checks to pass before merging`
    - `Status checks that are required.`: `status-check`
  - `Do not allow bypassing the above settings`
- `renovate/*` 
  - `Do not allow bypassing the above settings`
  - `Restrict who can push to matching branches`
    - `Restrict pushes that create matching branches`
      - `renovate`
      - Dedicated GitHub App
  - `Allow deletions`: Allow to delete pull request branches
  - `Allow force pushes`: Allow Renovate to rebase branches
    - `Specify who can force push`
      - `renovate`

## Personal Access Token

You should use [fine-grained personal access token](https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/) rather than legacy access token.

- Permissions:
  - `pull-requests: write`: To approve a pull request

## GitHub App

Create a GitHub App to push commits to Renovate branches and enable auto-merge.

- Permissions
  - `contents: write`
    - Push a commit to a pull request
    - Enable auto-merge
  - `pull-requests: write`
    - Enable auto-merge
  - `workflows: write`
    - Enable auto-merge of pull requests updating GitHub Actions Workflows

If `workflows: write` is missing, auto-merge is disabled.

> auto-merge was automatically disabled 8 minutes ago  
> Tried to create or update workflow without `workflows` permission

## GitHub Environment

[GitHub Environment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

- `renovate`
  - deployment branch rule: `renovate/*`, `main` (`main` is optional)
  - Secrets
    - `APP_ID`: GitHub App ID
    - `APP_PRIVATE_KEY`: GitHub App Private Key
    - `GH_TOKEN_APPROVE_RENOVATE_PR`: personal access token to approve pull requests

:::tip
`main` is optional but required to [support updating Renovate branches by pull request comment](guide.md#optional-update-branch-of-renovate-pull-request-by-comment).
:::

## GitHub Actions Workflows

Create three workflows.

- `test`: [example](https://github.com/aquaproj/example-update-checksum/blob/main/.github/workflows/test.yaml)
- `actionlint`: [example](https://github.com/suzuki-shunsuke/tfcmt/blob/main/.github/workflows/actionlint.yaml)
- (Optional) `update-branch`: [example](https://github.com/aquaproj/example-update-checksum/blob/main/.github/workflows/update-branch.yaml)

:::tip
`update-branch` is optional but required to [support updating Renovate branches by pull request comment](guide.md#optional-update-branch-of-renovate-pull-request-by-comment).
:::
