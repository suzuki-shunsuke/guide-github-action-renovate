---
sidebar_position: 400
---

# Summary - Personal Project

## Repository Setting

- Allow auto-merge

## Branch Protection Rule

- `main`
  - `Require a pull request before merging`
  - `Require status checks to pass before merging`
    - `Status checks that are required.`: `status-check`
  - `Do not allow bypassing the above settings`

## GitHub App

Create a GitHub App to push commits, approve a pull request, and enable auto-merge.

- Permissions
  - `contents: write`
    - Push a commit to a pull request
    - Enable automerge
  - `pull-requests: write`
    - Enable automerge
    - Approve a pull request

## GitHub Actions Workflow

Create two workflows.

- `test`: [example](https://github.com/aquaproj/example-update-checksum-public/blob/main/.github/workflows/test.yaml)
- `actionlint`: [example](https://github.com/suzuki-shunsuke/tfcmt/blob/main/.github/workflows/actionlint.yaml)
