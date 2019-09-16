interface Photo {
  id: string;
  url: string;
}

interface Container {
  id: string;
  name: string;
}

interface Tag {}

interface Item {
  id: string;
  photos: Array<Photo>;
  location: Container;
  name?: string;
  tags?: Array<Tag>;
}
