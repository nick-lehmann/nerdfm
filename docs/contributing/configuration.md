# Configuration

All configuration lives in the `config` directory and is split into multiple files for better managability.

We distinguish between pure configuration options and secrets. Configuration options are stored in the config files and checked into version control. However, secrets are stored in `.env` files and are not checked into version control. If you need to use a secret in the configuration, you can reference it using the `${SECRET_NAME}` syntax.

Every file defined in the configuration files has to be relative to the project root.