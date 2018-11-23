# v7.0.1
* Update README
* Update dependencies

# v2.0.0 -> v7.0.0
* Update dependencies
* Update README
* Increase the version to follow Angular version

# v1.2.5
* Be able to hide progress bar

# v1.2.0
* Add NgxUiLoaderBlurred directive for blurring the page content while the foreground loading is showed. See [NgxUiLoaderBlurred](#ngxuiloaderblurred_directive)
* `NGX_POSITIONS` is deprecated. Use `POSITION` instead
* `PB_DIRECTIONS` is deprecated. Use `PB_DIRECTION` instead
* `SPINNER_TYPES` is deprecated. Use `SPINNER` instead

# v1.1.8
* Http interceptor - Can configure to not show loader for some API urls
* Npm packages - version bump

# v1.1.5
* Be able to show loader automatically for http requests - Http interceptor

# v1.1.2
* Add more spinner types (total 22 spinners)
* BugFix: Background spinner (if active) should be showed after the foreground spinner is closed out

# v1.1.1
* Bugs fixed


# v1.1.0
* Show loader automatically when navigating between app routes
* Add more spinner types
* Be able to set a threshold
* BugFix: Set z-index of background spinner to 99997

# v1.0.2
* Update example app and README

# v1.0.1
* BugFix: Position of background spinner is not fixed when scrolling
* BugFix: Unsafe Base64 logo url
* BugFix: Logo, foreground spinner and loading text are centered correctly and can set the gap between them via gap input

# v1.0.0
* Show foreground loader with progress bar
* Show background loader with different id for different tasks
* There are 12 spinner types available
* Be able to add logo, loading text
* Be able to change position of spinners, logo and loading text
* Be able to change color and size of spinners and progress bar
* Be able to change the direction of progress bar
