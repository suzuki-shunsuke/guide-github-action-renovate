---
sidebar_position: 100
---

# Guide of GitHub Actions and Renovate

Guide for building `nice` GitHub Actions Workflows with Renovate.

`nice` means

- Automated
  - Automerge almost pull requests by Renovate
  - Decrease the review burden of human
  - Keep dependencies up-to-date
  - Autogenerate code if necessary
- Safe
  - Stop automerging pull requests that human should review
  - Test dependency updates in CI
    - To automerge pull requests, the test in CI is mandatory
- Secure
  - Prevent Renovate and the automerge feature from being abused
    - Prevent malicious changes from being merged without review

## Summary

- [Summary for personal project](summary-personal-project.md)
- [Summary for team development](summary-team-development.md)

## Detail

[Detail](detail.md)

## LICENSE

[MIT](https://github.com/suzuki-shunsuke/guide-github-action-renovate/blob/main/LICENSE)
