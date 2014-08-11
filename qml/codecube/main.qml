import QtQuick 2.2
import "compiler.js" as Compiler

Rectangle {
    visible:true
    width:1000
    height:800
    color: "transparent"

    Image {
        anchors.fill: parent
        source: "background.jpg"
        fillMode: Image.PreserveAspectCrop
    }

    Item {

        transform: Rotation { origin.x: zero.x+100; origin.y: zero.y+100; axis { x: 1; y: 0; z: 0 } angle: 50 }
        Rectangle {
            id: zero

            width: 100
            height: width
            x: 300
            y: 100
            radius: 10
            border.width: 5
            color: "white"
        }

        Rectangle {
            id: one

            width: 100
            height: width
            x: 400
            y: 100
            radius: 10
            border.width: 5
            color: "white"
        }

        Rectangle {
            id: two

            width: 100
            height: width
            x: 300
            y: 200
            radius: 10
            border.width: 5
            color: "white"
        }

        Rectangle {
            id: three

            width: 100
            height: width
            x: 400
            y: 200
            radius: 10
            border.width: 5
            color: "white"
        }
    }



    Item {

        transform: Rotation { origin.x: four.x+100; origin.y: four.y+100; axis { x: 0; y: -1; z: 0 } angle: 50 }

        Rectangle {
            id: four

            width: 100
            height: width
            x: 100
            y: 300
            radius: 10
            border.width: 5
            color: "green"
        }

        Rectangle {
            id: five

            width: 100
            height: width
            x: 200
            y: 300
            radius: 10
            border.width: 5
            color: "green"
        }

        Rectangle {
            id: six

            width: 100
            height: width
            x: 100
            y: 400
            radius: 10
            border.width: 5
            color: "green"
        }

        Rectangle {
            id: seven

            width: 100
            height: width
            x: 200
            y: 400
            radius: 10
            border.width: 5
            color: "green"
        }
    }


    Rectangle {
        id: eight

        width: 100
        height: width
        x: 300
        y: 300
        radius: 10
        border.width: 5
        color: "red"
    }

    Rectangle {
        id: nine

        width: 100
        height: width
        x: 400
        y: 300
        radius: 10
        border.width: 5
        color: "red"
    }

    Rectangle {
        id: ten

        width: 100
        height: width
        x: 300
        y: 400
        radius: 10
        border.width: 5
        color: "red"
    }

    Rectangle {
        id: eleven

        width: 100
        height: width
        x: 400
        y: 400
        radius: 10
        border.width: 5
        color: "red"
    }


    Item {

        transform: Rotation { origin.x: twelve.x+100; origin.y: twelve.y+100; axis { x: 0; y: 1; z: 0 } angle: 50 }

        Rectangle {
            id: twelve

            width: 100
            height: width
            x: 500
            y: 300
            radius: 10
            border.width: 5
            color: "blue"
        }

        Rectangle {
            id: thirteen

            width: 100
            height: width
            x: 600
            y: 300
            radius: 10
            border.width: 5
            color: "blue"
        }

        Rectangle {
            id: fourteen

            width: 100
            height: width
            x: 500
            y: 400
            radius: 10
            border.width: 5
            color: "blue"
        }

        Rectangle {
            id: fifteen

            width: 100
            height: width
            x: 600
            y: 400
            radius: 10
            border.width: 5
            color: "blue"
        }
    }


    Rectangle {
        id: sixteen

        width: 100
        height: width
        x: 700
        y: 300
        radius: 10
        border.width: 5
        color: "orange"
    }

    Rectangle {
        id: seventeen

        width: 100
        height: width
        x: 800
        y: 300
        radius: 10
        border.width: 5
        color: "orange"
    }

    Rectangle {
        id: eighteen

        width: 100
        height: width
        x: 700
        y: 400
        radius: 10
        border.width: 5
        color: "orange"
    }

    Rectangle {
        id: nineteen

        width: 100
        height: width
        x: 800
        y: 400
        radius: 10
        border.width: 5
        color: "orange"
    }

    Item {

        transform: Rotation { origin.x: twenty.x+100; origin.y: twenty.y+100; axis { x: -1; y: 0; z: 0 } angle: 50 }

        Rectangle {
            id: twenty

            width: 100
            height: width
            x: 300
            y: 500
            radius: 10
            border.width: 5
            color: "yellow"
        }

        Rectangle {
            id: twentyone

            width: 100
            height: width
            x: 400
            y: 500
            radius: 10
            border.width: 5
            color: "yellow"
        }

        Rectangle {
            id: twentytwo

            width: 100
            height: width
            x: 300
            y: 600
            radius: 10
            border.width: 5
            color: "yellow"
        }

        Rectangle {
            id: twentythree

            width: 100
            height: width
            x: 400
            y: 600
            radius: 10
            border.width: 5
            color: "yellow"
        }
    }

    Rectangle {
        id: blank

        width: 0
        height: 0
        x: 0
        y: 0
    }

    Column {
        id: options

        anchors.right:parent.right
        anchors.bottom:parent.bottom
        spacing: 20

        Row {
            anchors.horizontalCenter: parent.horizontalCenter
            spacing: 20

            Repeater {
                model: ["Shuffle", "Reset"]

                Rectangle {
                    width: 150
                    height: 50
                    radius: 10
                    border.width: 5

                    Text {
                        text: modelData
                        anchors.centerIn: parent
                        font.pointSize: 20
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked:
                            switch(modelData){
                            case "Shuffle": Compiler.shuffle(); break;
                            case "Reset": Compiler.reset(); break;
                            }
                    }
                }
            }
        }

        Row {
            anchors.horizontalCenter: parent.horizontalCenter
            spacing: 20

            Repeater {
                model: ["x", "y", "z"]

                Rectangle {
                    width: 50
                    height: width
                    radius: 10
                    border.width: 5

                    Text {
                        text: modelData
                        anchors.centerIn: parent
                        font.pointSize: 20
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked:
                            switch(modelData){
                            case "x": Compiler.shiftX(); break;
                            case "y": Compiler.shiftY(); break;
                            case "z": Compiler.shiftZ(); break;
                            }
                    }
                }
            }
        }

        Row {
            spacing: 20

            Repeater {
                model: ["L", "R", "U", "D", "F", "B"]

                Rectangle {
                    width: 50
                    height: width
                    radius: 10
                    border.width: 5

                    Text {
                        text: modelData
                        anchors.centerIn: parent
                        font.pointSize: 20
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked:
                            switch(modelData){
                            case "L": Compiler.clockwiseLeft(); break;
                            case "R": Compiler.clockwiseRight(); break;
                            case "U": Compiler.clockwiseUp(); break;
                            case "D": Compiler.clockwiseDown(); break;
                            case "F": Compiler.clockwiseFront(); break;
                            case "B": Compiler.clockwiseBack(); break;
                            }
                    }
                }
            }
        }

        Row {
            spacing: 20

            Repeater {
                model: ["L'", "R'", "U'", "D'", "F'", "B'"]

                Rectangle {
                    width: 50
                    height: width
                    radius: 10
                    border.width: 5

                    Text {
                        text: modelData
                        anchors.centerIn: parent
                        font.pointSize: 20
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked:
                            switch(modelData){
                            case "L'": Compiler.counterwiseLeft(); break;
                            case "R'": Compiler.counterwiseRight(); break;
                            case "U'": Compiler.counterwiseUp(); break;
                            case "D'": Compiler.counterwiseDown(); break;
                            case "F'": Compiler.counterwiseFront(); break;
                            case "B'": Compiler.counterwiseBack(); break;
                            }
                    }
                }
            }
        }
    }

    Rectangle {
        x: 600
        y: 575
        height: 50
        width: 500
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: commandConsole.bottom
        color: "transparent"

        Text {
            id: outputText
            anchors.centerIn: parent
            font.pixelSize: 20
            color: "white"
            text: ""
        }
    }


    Rectangle {
        id: commandConsole
        x: 600
        y: 175
        height: 50
        width: 500
        radius: 10
        border.width: 5
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: parent.top
        anchors.topMargin: 35

        TextInput {
            id: commandInput

            anchors.centerIn: parent
            font.pixelSize: 20 //replace
            text: "Enter Commands"
            cursorVisible: false
            Keys.onReturnPressed: {
                Compiler.interpert(text)
            }
        }

        MouseArea {
            propagateComposedEvents: true
            anchors.fill: parent
            onClicked: {
                outputText.text = ""
                commandInput.text=""
                mouse.accepted = false
                commandInput.forceActiveFocus();
            }
        }
    }
}
