{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.python311
    pkgs.nodejs_20
    pkgs.nodePackages.node-gyp
    pkgs.pkg-config
    pkgs.gcc
    pkgs.gnumake
  ];

  shellHook = ''
    export npm_config_python=${pkgs.python311}/bin/python3.11
  '';
}

