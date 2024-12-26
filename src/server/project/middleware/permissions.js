
const AdminPermissions = {
  UploadFiles: "upload:files",
  Read: "read:admin-messages",
  View: "view:docs",
};

const InspectorPermissions = {
  Read: "read:admin-messages",  // Permissão para inspetor visualizar mensagens
  View: "view:docs",
};

const TechnicianPermissions = {
  Read: "read:admin-messages",  // Permissão para técnico visualizar mensagens
  View: "view:docs",
};


module.exports = {AdminPermissions, InspectorPermissions, TechnicianPermissions}


