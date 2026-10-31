# Perf's blog

Mattia Perfumo's personal site and technical blog, built with Jekyll and Minima and hosted at [mattiaperfumo.it](https://mattiaperfumo.it).

## Local development

Install Ruby and Bundler, then run:

```sh
script/bootstrap
script/server
```

The preview runs at `http://localhost:6942`. Restart it after editing `_config.yml`.

### Tested setup on Mattia's Mac

The current dependency set builds with the installed Ruby 3.1.0 and Bundler 2.3.3. Dependencies are installed in the ignored `vendor/bundle/` directory. To start the preview in a fresh terminal:

```sh
cd /Users/perf/Documents/GitHub/mperf.github.io
export PATH="$HOME/.rbenv/versions/3.1.0/bin:$PATH"
bundle _2.3.3_ exec script/server --host 127.0.0.1 --livereload
```

Open `http://127.0.0.1:6942/`. Content changes rebuild automatically and live reload refreshes the browser. Press Ctrl+C in the server terminal to stop it.

The ignored `.bundle/config` sets the local dependency path and compiles `ffi` against macOS's system library. If reinstalling on this Mac without that configuration, run these before `script/bootstrap`:

```sh
bundle _2.3.3_ config set --local path vendor/bundle
bundle _2.3.3_ config set --local build.ffi '--enable-system-libffi --with-cflags=-I/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/ffi'
```

WEBrick is an explicit dependency because Jekyll 3 needs it to serve previews on Ruby 3.

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

## Article language visibility

Writing and categories hide posts with `lang: it` by default. The Include Italian posts switch reveals them for the current page. Every page load starts with Italian posts hidden. Article URLs remain accessible directly. Set `lang: en` or `lang: it` in each post's front matter.

Writing renders the full archive and paginates the filtered list in the browser, using the configured `paginate` size. This keeps English posts on the first page even when the latest posts are Italian. Previous generated archive URLs remain available. Without JavaScript, all English posts remain readable and Italian articles can still be opened directly.
