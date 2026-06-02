import ClicksAnalytics from "./ClicksAnalytics";
import UsersAnalytics from "./UsersAnalytics";

const AdminAnalytics = ({ selected }: { selected: string }) => {
  return (
    <div>
      {selected === "users" && <UsersAnalytics />}
      {selected === "clicks" && <ClicksAnalytics/>}
    </div>
  );
};

export default AdminAnalytics;
