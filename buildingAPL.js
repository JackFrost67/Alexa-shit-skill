module.exports = {
    datasourcesJSON(text){
        return  {
        "document": {
            "type": "APL",
            "version": "1.1",
            "settings": {},
            "theme": "dark",
            "import": [
                {
                    "name": "alexa-layouts",
                    "version": "1.0.0"
                }
            ],
            "resources": [
                {
                    "description": "Stock color for the light theme",
                    "colors": {
                        "colorTextPrimary": "#151920"
                    }
                },
                {
                    "description": "Stock color for the dark theme",
                    "when": "${viewport.theme == 'dark'}",
                    "colors": {
                        "colorTextPrimary": "#f0f1ef"
                    }
                },
                {
                    "description": "Standard font sizes",
                    "dimensions": {
                        "textSizeBody": 48,
                        "textSizePrimary": 27,
                        "textSizeSecondary": 25,
                        "textSizeSecondaryHint": 25
                    }
                },
                {
                    "description": "Common spacing values",
                    "dimensions": {
                        "spacingThin": 6,
                        "spacingSmall": 12,
                        "spacingMedium": 24,
                        "spacingLarge": 48,
                        "spacingExtraLarge": 72
                    }
                },
                {
                    "description": "Common margins and padding",
                    "dimensions": {
                        "marginTop": 40,
                        "marginLeft": 60,
                        "marginRight": 60,
                        "marginBottom": 40
                    }
                }
            ],
            "styles": {
                "textStyleBase": {
                    "description": "Base font description; set color",
                    "values": [
                        {
                            "color": "@colorTextPrimary"
                        }
                    ]
                },
                "textStyleBase0": {
                    "description": "Thin version of basic font",
                    "extend": "textStyleBase",
                    "values": {
                        "fontWeight": "100"
                    }
                },
                "textStyleBase1": {
                    "description": "Light version of basic font",
                    "extend": "textStyleBase",
                    "values": {
                        "fontWeight": "300"
                    }
                },
                "mixinBody": {
                    "values": {
                        "fontSize": "@textSizeBody"
                    }
                },
                "mixinPrimary": {
                    "values": {
                        "fontSize": "@textSizePrimary"
                    }
                },
                "mixinSecondary": {
                    "values": {
                        "fontSize": "@textSizeSecondary"
                    }
                },
                "textStylePrimary": {
                    "extend": [
                        "textStyleBase1",
                        "mixinPrimary"
                    ]
                },
                "textStyleSecondary": {
                    "extend": [
                        "textStyleBase0",
                        "mixinSecondary"
                    ]
                },
                "textStyleBody": {
                    "extend": [
                        "textStyleBase1",
                        "mixinBody"
                    ]
                },
                "textStyleSecondaryHint": {
                    "values": {
                        "fontFamily": "Bookerly",
                        "fontStyle": "italic",
                        "fontSize": "@textSizeSecondaryHint",
                        "color": "@colorTextPrimary"
                    }
                }
            },
            "onMount": [],
            "graphics": {},
            "commands": {},
            "layouts": {},
            "mainTemplate": {
                "description": "********* Full-screen background image **********",
                "parameters": [
                    "payload"
                ],
                "items": [
                    {
                        "when": "${viewport.shape == 'round'}",
                        "type": "Container",
                        "direction": "column",
                        "items": [
                            {
                                "type": "Image",
                                "source": "${payload.bodyTemplate1Data.backgroundImage.sources[0].url}",
                                "position": "absolute",
                                "width": "100vw",
                                "height": "100vh",
                                "scale": "best-fill"
                            },
                            {
                                "type": "AlexaHeader",
                                "headerTitle": "${payload.bodyTemplate1Data.title}",
                                "headerAttributionImage": "${payload.bodyTemplate1Data.logoUrl}"
                            },
                            {
                                "type": "Container",
                                "grow": 1,
                                "paddingLeft": "@marginLeft",
                                "paddingRight": "@marginRight",
                                "paddingBottom": "@marginBottom",
                                "items": [
                                    {
                                        "type": "Text",
                                        "text": "${payload.bodyTemplate1Data.textContent.primaryText.text}",
                                        "fontSize": "@textSizeSecondary",
                                        "spacing": "@spacingSmall",
                                        "style": "textStyleBody"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Container",
                        "height": "100vh",
                        "items": [
                            {
                                "type": "Image",
                                "source": "${payload.bodyTemplate1Data.backgroundImage.sources[0].url}",
                                "position": "absolute",
                                "width": "100vw",
                                "height": "100vh",
                                "scale": "best-fill"
                            },
                            {
                                "type": "Container",
                                "paddingLeft": "@marginLeft",
                                "paddingRight": "@marginRight",
                                "paddingBottom": "@marginBottom",
                                "items": [
                                    {
                                        "type": "Text",
                                        "style": "textStyleBody",
                                        "paddingTop": "150",
                                        "paddingBottom": "150",
                                        "textAlign": "center",
                                        "textAlignVertical": "center",
                                        "fontSize": "@textSizeBody",
                                        "text": "${payload.bodyTemplate1Data.textContent.primaryText.text}",
                                        "spacing": "@spacingSmall"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
            "datasources": {
                "bodyTemplate1Data": {
                    "type": "object",
                    "objectId": "bt1Sample",
                    "backgroundImage": {
                        "contentDescription": null,
                        "smallSourceUrl": null,
                        "largeSourceUrl": null,
                        "sources": [
                            {
                                "url": "https://airplanecrashpics.s3.amazonaws.com/image.jpg",
                                "size": "small",
                                "widthPixels": 0,
                                "heightPixels": 0
                            },
                            {
                                "url": "https://airplanecrashpics.s3.amazonaws.com/image.jpg",
                                "size": "large",
                                "widthPixels": 0,
                                "heightPixels": 0
                            }
                        ]
                    },
                    "textContent": {
                        "primaryText": {
                            "type": "PlainText",
                            "text" : text
                        }
                    }
                }
            }
        };
    }
};
