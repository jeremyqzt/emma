import GistRenderer from "./gistRenderer";

const GistFavouritesContainer = (props) => {
  const allGists = props.favourites || [];
  return (
    <>
      {allGists.map((gist, idx) => (
        <GistRenderer gist={gist} key={`gist-${idx}`} />
      ))}
    </>
  );
};

export default GistFavouritesContainer;
