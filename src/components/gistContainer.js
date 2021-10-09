import GistRenderer from "./gistRenderer";

const GistContainer = (props) => {
  const allGists = props.gists || [];
  const faved = props.favs || {};
  return (
    <>
      {!props.loading
        ? allGists.map((gist, idx) => (
            <GistRenderer
              alreadyFaved={Boolean(faved[gist.id])}
              addFavs={props.addFavs}
              gist={gist}
              key={`gist-${idx}`}
              isFavourites={props.isFavourites}
            />
          ))
        : null}
    </>
  );
};

export default GistContainer;
