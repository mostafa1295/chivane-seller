import { Platform } from "react-native";
import axios from "axios";
import config from "../../constants/config";
import FormData from "form-data";
import * as DocumentPicker from "expo-document-picker";

export function upload_to_wp(
  access_token,
  type = "*/*",
  sizeLimit = 104857600, //100MB
  id = false
) {
  return DocumentPicker.getDocumentAsync({
    type: type,
    copyToCacheDirectory: true,
  })
    .then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;

        if (Platform.OS === "android" && uri[0] === "/") {
          uri = `file://${uri}`;
          uri = uri.replace(/%/g, "%25");
        }
        let doc = null;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        let fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType,
        };
        doc = fileToUpload;
        if (doc.size > sizeLimit) {
          throw "SizeLimit";
        } else {
          let data = new FormData();
          data.append("file", doc);

          const url = config.baseUrl + "/wp-json/wp/v2/media";
          let reqHedear = {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + access_token,
          };

          var requestOptions = {
            method: "POST",
            body: data,
            headers: reqHedear,
          };

          // return axios({
          //   method: "post",
          //   url: url,
          //   data:data,
          //   headers: reqHedear,
          // })

          return fetch(config.baseUrl + "/wp-json/wp/v2/media", requestOptions)
            .then((response) => response.json())
            .then(function (response) {
              console.log(response.media_details);
              if (id) {
                return {
                  id: response.id,
                  url: response.media_details.sizes.full.source_url,
                };
              } else {
                if (type == "*/*") return response.source_url;
                if (type == "image/*")
                  return response.media_details.sizes.full.source_url;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    })
    .catch(function (e) {
      throw e;
    });
}
