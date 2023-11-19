LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "level": "DEBUG",  # Change this to the desired logging level
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG",  # Change this to the desired logging level
    },
}
