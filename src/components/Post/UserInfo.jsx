import moment from 'moment/moment';
import 'moment/locale/tr';

const UserInfo = ({ tweet }) => {
  // serverTimesamp'in oluşturduğu zamanı tarihe çevirme
  let date = tweet.createdAt?.toDate();

  // moment ile tarihin günümüzden uzaklığınıı hesapladık
  date = moment(date).fromNow();

  return (
    <div className="flex gap-3 items-center whitespace-nowrap">
      <p>{tweet.user.name}</p>

      <p className="text-gray-400 text-sm">
        @{tweet.user.name.toLowerCase().split(' ').join('_')}
      </p>

      <p className="text-gray-400 text-sm">{date}</p>

      {tweet.isEdited && <p className="text-gray-400 text-sm">*düzenlendi</p>}
    </div>
  );
};

export default UserInfo;