# White Label

## White Labeling the Mlchain UI

> **Heads-up**: White-Label is a feature only available in Mlchain Pro

### Instructions

Copy the files from the `assets` folder (next to this README file) to your Mlchain Server installation's `data/assets` folder. You should end up having a structure similar to the following:

```
├── data
│   └─ assets
│      ├── custom
│      │   └── logo.png
│      └── custom-theme.css
├── bp.exe
```

Then you can customize the styling by editing the `custom-theme.css` file.

### Configuration

There are 3 different elements that can be configured independently for the studio and the admin panel:

- The title displayed on the browser's tab
- The favicon displayed next to the title
- An additional stylesheet to override the default theme

```json
{
  ...
  "pro": {
    "branding": {
      "studio": {
        "title": "Mlchain Studio",
        "favicon": "assets/custom/my-favicon.ico",
        "customCss": "assets/custom/custom-theme.css"
      },
      "admin": {
        "title": "Mlchain Admin Panel",
        "favicon": "assets/custom/some-icon.png",
        "customCss": "assets/custom/custom-theme-admin.css"
      }
    }
  }
}

```
