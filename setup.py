from setuptools import find_packages
from setuptools import setup

with open("README.rst") as f:
    readme = f.read()

with open("LICENSE") as f:
    license = f.read()

setup(
    name="CallystoNBExtension",
    version="0.1.0",
    description="Callysto notebook extension",
    long_description=readme,
    author="Ian Allison",
    author_email="iana@pims.math.ca",
    url="https://github.com/callysto/callysto-nbextension",
    license=license,
    packages=find_packages(exclude=("tests", "docs")),
    include_package_data=True,
    data_files=[
        (
            "share/jupyter/nbextensions/callysto-nbextension",
            ["callysto-nbextension/static/index.js"],
        )
    ],
    zip_safe=False,
)
