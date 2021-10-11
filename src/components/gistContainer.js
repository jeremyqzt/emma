import GistRenderer from "./gistRenderer";
import { MAX_GISTS_RENDER } from "../utils/constants";

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
              shouldFetchGists={idx < MAX_GISTS_RENDER}
            />
          ))
        : null}
    </>
  );
};

export default GistContainer;
