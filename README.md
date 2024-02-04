# uuid-tools README

uuid-tools is a vs-code extension that includes various useful uuid manipulation commands.

## Installation
Open VS Code and press <kbd>F1</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> *or* <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open command palette, select **Install Extension** and type `uuid-tools`.

Or launch VS Code Quick Open (<kbd>Ctrl</kbd> + <kbd>P</kbd> *or* <kbd>Cmd</kbd> + <kbd>P</kbd> ), paste the following command, and press enter.
```bash
ext install uuid-tools
```

You can also install directly from the Marketplace within Visual Studio Code, searching for `uuid-tools`.

## Commands
This extension provides several commands in the Command Palette (<kbd>F1</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> *or* <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) for working with any files.

- **uuidgen**: Generates uuid string in the current file.
- **uuid2hex**: Replaces selected uuid with the equivalent hexadecimal representation ```4BCFA393-2EED-497F-ACBC-57E018823E3B``` to ```4BCFA3932EED497FACBC57E018823E3B```
- **uuid2arrc**: Replaces selected uuid with the equivalent c array. ```4BCFA393-2EED-497F-ACBC-57E018823E3B``` to ```const uint8_t uuid[16]={0x4B, 0xCF, 0xA3, 0x93, 0x2E, 0xED, 0x49, 0x7F, 0xAC, 0xBC, 0x57, 0xE0, 0x18, 0x82, 0x3E, 0x3B};```

## Release Notes

### 1.0.1

- Added extension icon

---

**Enjoy!*