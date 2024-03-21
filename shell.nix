{pkgs ? import <nixpkgs> {}}: let
  my-python-packages = ps:
    with ps; [

      #jupyter
      jupyter-core
      notebook

      #data
      pandas

      #scrap
      selenium
    ];
in
  pkgs.mkShell {
    name = "Python data shell";

    nativeBuildInputs = with pkgs.buildPackages; [
      (pkgs.python3.withPackages my-python-packages)
    ];
  }
