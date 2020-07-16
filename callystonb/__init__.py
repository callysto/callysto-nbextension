def _jupyter_nbextension_paths():
    return [
        dict(
            section="notebook",
            src="static",
            dest="callystonb",
            require="callystonb/index",
        )
    ]
