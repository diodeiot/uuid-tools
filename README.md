# uuid-tools

uuid-tools is a vs-code extension that can generate v1,v2,v3,v4,v5,v6,v7 UUIDs
and includes various useful uuid manipulation commands.

## Installation
Open VS Code and press <kbd>F1</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> *or* <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open command palette, select **Install Extension** and type `uuid-tools`.

Or launch VS Code Quick Open (<kbd>Ctrl</kbd> + <kbd>P</kbd> *or* <kbd>Cmd</kbd> + <kbd>P</kbd> ), paste the following command, and press enter.
```bash
ext install uuid-tools
```

You can also install directly from the Marketplace within Visual Studio Code, searching for `uuid-tools`.

## Commands
This extension provides several commands in the Command Palette (<kbd>F1</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> *or* <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) for working with any files.

- **uuid-tools: Generate nil UUID**: Generates uuid string with all zeros.
- **uuid-tools: Generate UUIDv1**: Generates version 1 uuid.
- **uuid-tools: Generate UUIDv2**: Generates version 2 uuid.
- **uuid-tools: Generate UUIDv3**: Generates version 3 uuid.
- **uuid-tools: Generate UUIDv4**: Generates version 4 uuid.
- **uuid-tools: Generate UUIDv5**: Generates version 5 uuid.
- **uuid-tools: Generate UUIDv6**: Generates version 6 uuid.
- **uuid-tools: Generate UUIDv7**: Generates version 7 uuid.
- **uuid-tools: Generate UUID**: Generates uuid specified in the preferences.
- **uuid-tools: Convert to hexadecimal**: Replaces selected uuid string with the equivalent hexadecimal representation.
- **uuid-tools: Convert to bytes**: Replaces selected uuid string with the comma-seperated hexadecimal bytes.

> **Note:** Selected uuid strings can contain space, double-quote and single-quote.

## Menus
- **uuid-tools: Generate UUID**: Generates uuid specified in the preferences.
  
## Usage
### UUID Generation
There are 3 different ways to generate UUID
- Set cursor and run the UUID generation command, this will generate at the cursor.
- Set multi cursors and run the UUID generation command, this will generate UUIDs at each cursor.
> **Note:** For the multiple UUID generation, UUID generation behavior can be controlled through `uuid-tools.multi-cursor-behavior` option.
- Select any text that includes any number of UUIDs and run the UUID generation command, this will replace existing UUIDs with the new ones.

## Options
| Option                             | Description                                          | Default |
| ---------------------------------- | ---------------------------------------------------- | ------- |
| `uuid-tools.uuid-version`          | Version of the UUID to generate                      | v4      |
| `uuid-tools.case`                  | Case of the generated UUID string                    | upper   |
| `uuid-tools.multi-cursor-behavior` | UUID generation behavior when multi-cursor is active | unique  |
| `uuid-tools.v2.domain`             | Domain of the UUID v2                                | null    |
| `uuid-tools.v2.identifier`         | Identifier of the UUID v2                            | null    |
| `uuid-tools.v3.namespace`          | Namespace of the UUID v3                             | null    |
| `uuid-tools.v3.name`               | Name of the UUID v3                                  | null    |
| `uuid-tools.v5.namespace`          | Namespace of the UUID v5                             | null    |
| `uuid-tools.v5.name`               | Name of the UUID v5                                  | null    |

## Release Notes

### Version 2.1.1

- Added officials

## Development
Maintainer Kadir Sevil <<kadir.sevil@diodeiot.com>>

Publisher Diode IoT Inc. <<info@diodeiot.com>>

---