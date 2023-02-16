# Detail

1. Continous update by Renovate
1. Automerge
1. Test

## GitHub branch protection rule

- [Managing a branch protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule)

You should protect the default branch by GitHub branch protection rule.
At least, the following settings should be enabled.

- `Require a pull request before merging`
- `Require status checks to pass before merging`
  - `Status checks that are required.`: `status-check`

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

## GitHub auto-merge feature

- [Automatically merging a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)

To merge a pull request safely, we enable GitHub auto-merge.
A pull request should be merged 

## Unify GitHub Actions Workflows to one Workflow for branch protection rule


