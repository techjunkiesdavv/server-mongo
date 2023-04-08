const ExpenditureQuery = '*[_type == "expenditure"]';
const CommitteeMembersQuery = '*[_type == "committeMembers"]';
const AnnouncementsQuery = '*[_type == "announcements"]';
const AboutQuery = '*[_type == "about"]';
const FacilityContactsQuery = '*[_type == "facilityContacts"]';
const BillsQuery = '*[_type == "bills"]';
const UserQuery = '*[_type == "user"]';

export const getquery = (text) => {
  switch (text) {
    case "expenditure":
      return ExpenditureQuery;
    case "committe_members":
      return CommitteeMembersQuery;
    case "about":
      return AboutQuery;
    case "announcements":
      return AnnouncementsQuery;
    case "facilityContacts":
      return FacilityContactsQuery;
    case "bills":
      return BillsQuery;
    case "user":
      return UserQuery;
    default:
      return -1; // check
  }
};
