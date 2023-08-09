# logging_config.py

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "generic",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "formatters": {
        "generic": {
            "format": "%(asctime)s [%(levelname)s] %(name)s %(message)s",
            "datefmt": "[%Y-%m-%d %H:%M:%S]",
            "class": "logging.Formatter",
        },
    },
}
