export const selectContactQuery = "SELECT * FROM contacts";
export const deleteContactQuery = "DELETE FROM contacts WHERE id=$1";
export const insertContactQuery = "INSERT INTO contacts(name, \"phoneWork\", \"phoneHome\", \"phoneMobile\", \"phoneOther\", email, address) VALUES ($1, $2, $3, $4, $5, $6, $7)";
export const updateContactQuery = "UPDATE contacts SET name=$1, \"phoneWork\"=$2, \"phoneHome\"=$3, \"phoneMobile\"=$4, \"phoneOther\"=$5, email=$6, address=$7 WHERE id=$8";
