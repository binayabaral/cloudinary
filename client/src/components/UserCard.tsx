interface UserCardProps {
  name: string;
  email: string;
  profilePicUrl: string;
}

const UserCard = (props: UserCardProps) => {
  const { name, email, profilePicUrl } = props;
  return (
    <div className='column'>
      <div className='display-img'>
        <img src={profilePicUrl} alt={name} />
      </div>
      <div className='form-group'>Name: {name}</div>
      <div className='form-group'>Email: {email}</div>
    </div>
  );
};

export default UserCard;
