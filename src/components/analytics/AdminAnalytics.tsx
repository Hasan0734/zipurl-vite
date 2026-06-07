import ClicksAnalytics from "./ClicksAnalytics";
import UrlsAnalytics from "./UrlsAnalytics";
import UsersAnalytics from "./UsersAnalytics";

const AdminAnalytics = ({ selected }: { selected: string }) => {
  return (
    <div>
      {selected === "users" && <UsersAnalytics />}
      {selected === "urls" && <UrlsAnalytics/>}
      {selected === "clicks" && <ClicksAnalytics/>}

    </div>
  );
};

export default AdminAnalytics;
