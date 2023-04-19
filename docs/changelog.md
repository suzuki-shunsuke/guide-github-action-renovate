---
sidebar_position: 600
---

# Changelog

## 2023-04-05

Fix `renovate/*`'s branch protection rules.
Enable `Allow force pushes` to allow Renovate to rebase branches.

## 2023-02-21

### Merge `renovate` workflow to `one` workflow

[#14](https://github.com/suzuki-shunsuke/guide-github-action-renovate/pull/14) [aquaproj/example-update-checksum#162](https://github.com/aquaproj/example-update-checksum/pull/162)

We created `renovate` workflow before because we misunderstood the specification of GitHub Environment's Deployment branches.
But we found we can run GitHub Actions jobs with GitHub Actions Environment in `one` workflow, so we merged `renovate` workflow to `one` workflow.

### GitHub Apps permissions: `workflows: write` is required to update GitHub Actions Workflows

If GitHub Apps doesn't have a permission `workflows: write`, GitHub Apps can't enable auto-merge.

> auto-merge was automatically disabled 8 minutes ago  
> Tried to create or update workflow without `workflows` permission

### Support updating branch by pull request comment

- Add a workflow `update-branch`
