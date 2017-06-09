import React, { Component } from "react";
import logo from "./logo.svg";
import GooglePicker from "./google-picker.js";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";
import RaisedButton from "material-ui/RaisedButton";

function copytext(text) {
  var textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  componentDidMount() {}
  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.container}>

          <GooglePicker
            clientId={
              "1016891734628-85ail9emia5p4ehibojf9re3e1ijen20.apps.googleusercontent.com"
            }
            // developerKey={"AIzaSyAW5inbzqOEd0XRd3nFOGoeE8w3ID4Ve88"}
            scope={["https://www.googleapis.com/auth/drive.readonly"]}
            onChange={data => {
              if (data.docs) {
                this.setState({ files: data.docs });
              }
              console.log("on change:", data);
            }}
            multiselect={true}
            navHidden={true}
            authImmediate={false}
            viewId={"DOCS"}
          >
            <RaisedButton label="Select Files" primary={true} />
          </GooglePicker>

          {this.state.files.map(file =>
            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <span style={{ width: "50%" }}>{file.name}</span>
              <span style={{ width: "50%" }}>
                <FlatButton
                  label=".pdf"
                  primary={true}
                  onClick={() =>
                    copytext(
                      `https://docs.google.com/document/d/${file.id}/export?format=pdf`
                    )}
                />
                <FlatButton
                  label=".docx"
                  primary={true}
                  onClick={() =>
                    copytext(
                      `https://docs.google.com/document/d/${file.id}/export?format=docx`
                    )}
                />
              </span>
            </div>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}
const styles = {
  container: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center"
  }
};
export default App;
