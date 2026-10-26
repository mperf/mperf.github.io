# Perf's blog

Mattia Perfumo's personal site and technical blog, built with Jekyll and Minima and hosted at [mattiaperfumo.it](https://mattiaperfumo.it).

## Local development

Install Ruby and Bundler, then run:

```sh
script/bootstrap
script/server
```

The preview runs at `http://localhost:6942`. Restart it after editing `_config.yml`.

Dependencies are pinned in `Gemfile.lock` through the `github-pages` gem. The lockfile was generated with Bundler 2.3.6 and currently lists older macOS platforms. If Bundler reports an unsupported platform, run `bundle lock --add-platform "$(ruby -e 'print Gem::Platform.local')"` and review the lockfile diff before installing. The dependency set predates Ruby 4; use a compatible Ruby environment to build it.

## Build checks

```sh
script/build
script/cibuild
```

`script/build` writes the site to `_site/`. `script/cibuild` builds in a temporary directory and checks the homepage, About page, compiled stylesheet, and second page of posts. It leaves the local preview output alone. Scripts also work when invoked from another directory and accept Jekyll arguments where applicable.

## Content and layout

- `about.markdown` contains the biography.
- `_config.yml` contains site metadata, navigation, social links, and pagination settings.
- `_posts/` contains articles. Preserve existing filenames and permalinks when editing published posts.
- `_layouts/` and `_includes/` contain the templates.
- `_sass/` and `assets/css/style.scss` contain the styles. Jekyll compiles the entry point to `/assets/css/style.css`.
- `assets/` contains article images, certificates, and favicons.
- `CNAME` declares the custom domain.

Keep generated output, dependencies, local Bundler settings, and Finder metadata out of Git. Before publishing biography changes, check the dated evidence in the personal branding workspace at `/Users/perf/Documents/personal-branding/research/linkedin-profile.md`. The K!nd4SUS co-founder role is confirmed; the current presidency remains unresolved.

Local edits do not publish the site. Review changes before committing and pushing to the publishing branch.
