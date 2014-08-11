CodeCube
========

2x2x2 Rubik's Cube implemented in QML, with a recursive descent parser for inputting Rubik's Cube notation.

How to Build
============

1. Install Qt 5.2.0
Windows 64b: http://download.qt-project.org/archive/qt/5.2/5.2.0/qt-windows-opensource-5.2.0-msvc2012_opengl-x86_64-offline.exe
Windows 32b: http://download.qt-project.org/archive/qt/5.2/5.2.0/qt-windows-opensource-5.2.0-msvc2012-x86-offline.exe
Other OS installs may work, just not tested.

2. Open Qt Creator.
3. Open the .pro file in the CodeCube Git folder with Qt Creator.
4. Press the green Build arrow in the lower left of Qt Creator.

Syntax
======

Commands: (L, L', R, R', U, U', D, D', F, F', B, B', x, y, z).
They can be combined with numbers (ex: L3, R3, B'5).
They can be combined into variables and reused. Variables can be used before being declared. (ex: $var L L B' $var=B L L;)