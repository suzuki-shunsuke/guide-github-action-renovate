---
sidebar_position: 600
---

# Changelog

## 2023-02-21

### Merge `renovate` workflow to `test` workflow

[#14](https://github.com/suzuki-shunsuke/guide-github-action-renovate/pull/14) [aquaproj/example-update-checksum#162](https://github.com/aquaproj/example-update-checksum/pull/162)

We created `renovate` workflow before because we misunderstood the specification of GitHub Environment's Deployment branches.
But we found we can run GitHub Actions jobs with GitHub Actions Environment in `test` workflow, so we merged `renovate` workflow to `test` workflow.

### GitHub Apps permissions: `workflows: write` is required to update GitHub Actions Workflows

If GitHub Apps doesn't have a permission `workflows: write`, GitHub Apps can't enable auto-merge.

> auto-merge was automatically disabled 8 minutes ago  
> Tried to create or update workflow without `workflows` permission
