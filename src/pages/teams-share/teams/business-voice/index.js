import { Layout as DashboardLayout } from "/src/layouts/index.js";
import { CippTablePage } from "/src/components/CippComponents/CippTablePage.jsx";
import { Button } from "@mui/material";
import { Add, PersonAdd, PersonRemove, LocationOn, NoAccounts } from "@mui/icons-material";

const Page = () => {
  const pageTitle = "Teams Business Voice";

  const actions = [
    // the modal dropdowns that were added below may not exist yet, and will need to be tested.
    {
      label: "Assign User",
      type: "POST",
      icon: <PersonAdd />,
      url: "/api/ExecTeamsVoicePhoneNumberAssignment",
      data: {
        PhoneNumber: "TelephoneNumber",
        PhoneNumberType: "NumberType",
        locationOnly: false,
      },
      fields: [
        {
          type: "autoComplete",
          name: "input",
          label: "Select User",
          multiple: false,
          creatable: false,
          api: {
            url: "/api/listUsers",
            labelField: (input) => `${input.displayName} (${input.userPrincipalName})`,
            valueField: "userPrincipalName",
          },
        },
      ],
      confirmText: "Select the User to assign the phone number to.",
    },
    {
      label: "Unassign User",
      type: "POST",
      icon: <PersonRemove />,
      url: "/api/ExecRemoveTeamsVoicePhoneNumberAssignment",
      data: {
        PhoneNumber: "TelephoneNumber",
        AssignedTo: "AssignedTo",
        PhoneNumberType: "NumberType",
      },
      confirmText: "Are you sure you want to remove the assignment?",
    },
    {
      label: "Set Emergency Location",
      type: "POST",
      icon: <LocationOn />,
      url: "/api/ExecTeamsVoicePhoneNumberAssignment",
      data: {
        PhoneNumber: "TelephoneNumber",
        locationOnly: true,
      },
      fields: [
        {
          type: "autoComplete",
          name: "input",
          label: "Emergency Location",
          api: {
            url: "/api/ListTeamsLisLocation",
            labelField: "Description",
            valueField: "LocationId",
          },
        },
      ],
      confirmText: "Select the Emergency Location.",
    },
  ];

  const offCanvas = {
    extendedInfoFields: [
      "TelephoneNumber",
      "AcquiredCapabilities",
      "AssignmentStatus",
      "AssignedTo",
    ],
    actions: actions,
  };

  const columns = [
    "AssignedTo.displayName",
    "TelephoneNumber",
    "AssignmentStatus",
    "NumberType",
    "AcquiredCapabilities",
    "IsoCountryCode",
    "PlaceName",
    "ActivationState",
    "IsOperatorConnect",
    "AcquisitionDate",
  ];

  const filters = [
    {
      filterName: "Unassigned User Numbers",
      filter: "AssignmentStatus eq Unassigned and AcquiredCapabilities like UserAssignment",
    },
    {
      filterName: "Assigned User Numbers",
      filter: "AssignmentStatus eq UserAssigned and AcquiredCapabilities like UserAssignment",
    },
  ];

  return (
    <CippTablePage
      title={pageTitle}
      apiUrl="/api/ListTeamsVoice"
      actions={actions}
      offCanvas={offCanvas}
      simpleColumns={columns}
      filters={filters}
    />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
