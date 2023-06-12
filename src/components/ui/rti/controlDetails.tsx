import React from "react";

import { CONTROL } from "@/types/schema";
import { Label } from "@/components/ui/label";

type Props = {
  control: CONTROL;
};

type Image = { src: string; alt: string };

export function ControlDetails({ control }: Props) {
  const [images, setImages] = React.useState<Image[]>([]);
  const comment = control.CommCont ?? "";

  React.useEffect(() => {
    const photos = control.Photos?.PhotoCtrl;

    if (photos && photos.length > 0) {
      const imagesList: Image[] = photos.map((photo) => ({
        src: "data:image/png;base64," + photo.FicPhotoControle,
        alt: photo.LibPhotoControle
      }));

      setImages(imagesList);
    }
  }, []);

  return (
    <div className="grid grid-cols-2 items-center gap-4 mb-5">
      {images &&
        images.map((image: Image, index: number) => (
          <img
            key={index}
            className={`${
              images.length === 2 ? "col-span-1 w-full" : "col-span-2 w-1/2"
            } `}
            src={image.src}
            alt={image.alt}
          />
        ))}
      <div className="col-span-2">
        <Label className="font-bold">Commentaire</Label>
        <p className="col-span-2">{comment}</p>
      </div>
    </div>
  );
}
