const Permission = require('../models/permission')

const getUserCompanyIds = async (userId) => {
  const permissions = await Permission.find({ userId }).select('companyId')
  return permissions.map((item) => String(item.companyId))
}

const ensureCompanyAccess = async (userId, companyId) => {
  const hasAccess = await Permission.exists({ userId, companyId })

  if (!hasAccess) {
    throw new Error('Usuário não possui permissão para esta empresa')
  }
}

module.exports = {
  getUserCompanyIds,
  ensureCompanyAccess
}
