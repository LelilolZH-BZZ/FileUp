<?php
    include($_SERVER["DOCUMENT_ROOT"]."/php/settings.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?php
                echo $meta["title"];
        ?></title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Montserrat+Alternates&display=swap" rel="stylesheet">
        <link type="text/css" rel="stylesheet" href="/css/style.css">
        <link type="text/css" rel="stylesheet" href="/css/mobile.css" media="screen and (max-width: 800px)">
        <link type="image/png" rel="icon" href="img/logo.png">
    </head>
    <body>
        <div class="titleBox_outher">
            <div class="titleBox_inner">
                <div class="titleBox_hover" onclick="reloadPage();"></div>
                <img class="logoSelf_inner" src="/img/logo.png" alt="Your Brwoser can't display our logo.">
                <div class="titleBox_Text_inner">
                    <h1>FileUp</h1>
                </div>
            </div>
        </div>
        <div class="frameBox_outher">
            <div class="settingsUpload makeInvisible">
                <div class="settingsUpload_inner">
                    <h3>Einstellungen:</h3>
                    <div class="settingsUploadOneLine">
                        <span>Löschen nach: </span>
                        <span>
                            <input class="smallFiller" placeholder="00" type="number" max="120" min="0" value="01" id="stunde">
                        </span>
                        <span> h und </span>
                        <span>
                            <input class="smallFiller" placeholder="00" type="number" max="60" min="0" id="minuten">
                        </span>
                        <span> min</span>
                    </div>
                    <div class="settingsUploadOneLine">
                        Max Downloads: <input type="number" value="100" min="1" max="1000" id="downloads">
                    </div>
                    <div class="settingsUploadOneLine">
                        Max Viewers: <input type="number" value="100" min="10" max="10000" id="viewers">
                    </div>
                    <div class="settingsUploadOneLine">
                        Passwort festlegen: <input placeholder="Leer lassen wenn kein" id="passwort">
                    </div>
                    <div class="settingsUploadOneLine">
                        <button class="settingsSaveButton" onclick="saveSettingsForUpload()">
                            Speichern und Link erhalten
                        </button>
                    </div>
                </div>
            </div>
            <div class="frameBox_dropBox2_outher">
                <div class="frameBox_dropBox2_inner">
                    <h2 class="frameBox_dropBox2_upper">
                        Einfache, private Dateifreigabe
                    </h2>
                    <div class="frameBox_dropBox2_under_outher">
                        <img class="frameBox_dropBox2_under" src="/img/upload.svg" alt="Datei auswählen und hochladen.">
                    </div>
                </div>
            </div>
            <div class="frameBox_dropBox1_outher">
                <div class="frameBox_dropBox1_inner">
                    <form id="resetForm">
                        <label class="fileInput_label" for="fileInput" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);"></label>
                        <input type="file" id="fileInput" name="fileInput[]" onchange="inputChanges()" multiple>
                    </form>
                    <img class="frameBox_dropBox1_uploadIcon_inner" src="/img/add.svg" alt="Choose file here.">
                    <div class="fileContentViewer makeInvisible"></div>
                    <div class="uploadButtonBox_inner uploadButtonBox_outher makeInvisible" onclick="submitButton()">Hochladen</div>
                </div>
            </div>
        </div>
        <div class="footer_outher">
            <div class="footer_inner">
                &copy; <?php echo date("Y"); ?> levsaminskij.ch
            </div>
        </div>
        <script src="js/script.js"></script>
    </body>
</html>