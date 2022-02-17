import React from "react";
import {
  NotEditable,
  component,
  fields,
} from "@keystone-6/fields-document/component-blocks";

const ImageComponent = ({ image }) => {
  console.log(JSON.stringify(image, null, 2));

  return (
    <NotEditable>
      {image.value && (
        <img
          style={{ width: "200px", height: "auto" }}
          src={image.value.data.imageFile.url}
          alt={image.value.data.altText}
        />
      )}
    </NotEditable>
  );
};

// naming the export componentBlocks is important because the Admin UI
// expects to find the components like on the componentBlocks export
export const componentBlocks = {
  image: component({
    component: ImageComponent,
    label: "Image",
    props: {
      image: fields.relationship({
        label: "Image",
        relationship: "image",
      }),
    },
  }),
};
