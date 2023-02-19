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

Renovate is awesome and can be introduced easily, but it isn't enough to just install Renovate. To utilize Renovate fully, you should not only tune Renovate settings but also configure GitHub Repository settings properly and tune GitHub Actions Workflows in accordance with Renovate.

In this document we describe how to build nice GitHub Actions Workflows in accordance with Renovate.

## Summary

`Summary` summarizes the settings for `nice` GitHub Actions Workflows.

- [Summary for personal project](summary-personal-project.md)
- [Summary for team development](summary-team-development.md)

## Detail

[Detail](detail.md) describes the detail of how you build `nice` GitHub Actions Workflows with Renovate.

## LICENSE

[MIT](https://github.com/suzuki-shunsuke/guide-github-action-renovate/blob/main/LICENSE)
