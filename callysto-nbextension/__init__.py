def _jupyter_nbextension_paths():
    return [
        dict(
            section="notebook",
            src="static",
            dest="callysto-nbextension",
            require="callysto-nbextension/index",
        )
    ]
