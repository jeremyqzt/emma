import { useState } from "react";
import { useApi } from "../hooks/hooks";
import { store } from "react-notifications-component";

import Header from "../components/header";
import GistContainer from "../components/gistContainer";
import GistFavouritesContainer from "../components/favouriteGists";
import Container from "react-bootstrap/Container";

import Loading from "../components/loading";
import NoUser from "../components/noUser";
import NoGists from "../components/noGists";
import NoSearch from "../components/noSearches";

import { TAB, DEFAULT_NOTIF } from "../utils/constants";

const Gist = () => {
  const [url, setUrl] = useState("");
  const [results, loading, refresh] = useApi(url);

  const [tab, setTab] = useState(TAB.SEARCH);

  const [favs, setFavs] = useState([]);
  const [favsIds, setFavsIds] = useState({});

  const onClickSearch = (name) => {
    setUrl(`GET /users/${name}/gists`);
  };

  const onClickAddFavs = (gist) => {
    const gistId = gist.id;

    if (!Boolean(favsIds[gistId])) {
      setFavsIds({ ...favsIds, [gistId]: true });
      setFavs([{ ...gist }, ...favs]);
      store.addNotification({
        ...DEFAULT_NOTIF,
        title: "Success",
        message: "Added to favourites!",
        type: "success",
      });
    }
  };

  const onClickRemoveFavs = (id) => {
    if (Boolean(favsIds[id])) {
      const newFavs = favs.filter((favGist) => favGist.id !== id);
      setFavs(newFavs);
      setFavsIds({ ...favsIds, [id]: false });

      store.addNotification({
        ...DEFAULT_NOTIF,
        title: "Removed",
        message: "Removed gist from favourites!",
        type: "warning",
      });
    }
  };

  const noUser = results && results.status === 404 && !loading && url !== "";
  const noGists =
    results && results.data?.length === 0 && !loading && url !== "";
  const noFavGists = favs.length === 0;
  return (
    <>
      <Header
        loading={loading}
        onClickSearch={onClickSearch}
        onRefresh={refresh}
        tab={tab}
        setTab={setTab}
      />
      {tab === TAB.SEARCH ? (
        <Container>
          <>
            {url === "" ? <NoSearch /> : null}
            {loading ? <Loading /> : null}
            {noUser ? <NoUser /> : null}
            {noGists ? <NoGists /> : null}

            {!noUser && !noGists && !loading ? (
              <GistContainer
                gists={results?.data}
                loading={loading}
                addFavs={onClickAddFavs}
                favs={favsIds}
                isFavourites={false}
              />
            ) : null}
          </>
        </Container>
      ) : (
        <Container>
          {noFavGists ? <NoGists /> : null}

          <GistFavouritesContainer
            favourites={favs}
            remove={onClickRemoveFavs}
            isFavourites
          />
        </Container>
      )}
    </>
  );
};

export default Gist;
