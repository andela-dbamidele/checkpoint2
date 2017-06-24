import Validator from 'validator';

export function isDigit(number) {
  if (!Validator.isNumeric(number)) return false;
  return true;
}

export function validateAccess(
  docUserId,
  docAccess,
  docRoleId,
  userId,
  userRoleId
  ) {
  const errorMsg = {};
  let validatedUser = true;

  if (docUserId !== userId && docAccess !== 0 &&
    docRoleId !== userRoleId && userRoleId !== 1
  ) {
    validatedUser = false;
    errorMsg.message = 'Sorry, we cannot process your' +
      ' request at this time. Please contact the Administrator';
  }

  return {
    errorMsg,
    validatedUser
  };
}

