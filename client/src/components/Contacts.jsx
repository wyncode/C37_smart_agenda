import React from 'react';

const Contacts = () => {
  const contacts = [
    'Amber Anderson',
    'Daniel Johnson',
    'Chris Daniels',
    'Andres Bustos',
    'Anna Rose'
  ].sort();

  let letter = '';

  return (
    <div>
      {contacts.map((contact) => {
        if (contact[0] !== letter) {
          letter = contact[0];

          return (
            <div>
              <p>{letter}</p>
              <p>{contact}</p>
            </div>
          );
        }

        return <p>{contact}</p>;
      })}
    </div>
  );
};

export default Contacts;
