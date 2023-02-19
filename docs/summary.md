# Summary

## Repository Setting

- Allow auto-merge

## Case 1. OSS

Set up GitHub repository's branch protection rule of `default` branch

## Case 2. Private Repository multiple users have write permission

Set up GitHub repository's branch protection rule of `default` branch

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

Branches `renovate/*` should be protected so that malicious users can't push commits to a Renovate pull request and approve and merge it.

If you have to push commits to pull requests from Renovate, GitHub App is required.
This GitHub App should be dedicated and the Private Key should be protected by [GitHub Environment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment).
If you don't have to push commits 

- Create two or three workflows
