import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

//custom
const Marcas = React.lazy(() => import('./views/custom/marcas/Marcas'))
const MarcasDetails = React.lazy(() => import('./views/custom/marcas/MarcasDetails'))
const Modelos = React.lazy(() => import('./views/custom/modelos/Modelos'))
const ModelosDetails = React.lazy(() => import('./views/custom/modelos/ModelosDetails'))
const Sucursales = React.lazy(() => import('./views/custom/sucursales/Sucursales'))
const SucursalesDetails = React.lazy(() => import('./views/custom/sucursales/SucursalesDetails'))
const Proveedores = React.lazy(() => import('./views/custom/proveedores/Proveedores'))
const ProveedoresDetails = React.lazy(() => import('./views/custom/proveedores/ProveedoresDetails'))
const Repuestos = React.lazy(() => import('./views/custom/repuestos/Repuestos'))
const RepuestosCreate = React.lazy(() => import('./views/custom/repuestos/RepuestosCreate'))
const RepuestosEdit = React.lazy(() => import('./views/custom/repuestos/RepuestosEdit'))
const RepuestosDetails = React.lazy(() => import('./views/custom/repuestos/RepuestosDetails'))
const Servicios = React.lazy(() => import('./views/custom/servicios/Servicios'))
const serviciosDetails = React.lazy(() => import('./views/custom/servicios/ServicioDetails'))

const Ventas = React.lazy(() => import('./views/custom/ventas/Ventas'))
const VentasCreate = React.lazy(() => import('./views/custom/ventas/VentasCreate'))
const VentasEdit = React.lazy(() => import('./views/custom/ventas/VentasEdit'))
const Empleados = React.lazy(() => import('./views/custom/Empleados/Empleados'))
const RegistrarEmpleados = React.lazy(() => import('./views/custom/Empleados/RegistrarEmpleados'))
const Vehiculos = React.lazy(() => import('./views/custom/Vehiculos/Vehiculos'))
const VehiculosDetails = React.lazy(() => import('./views/custom/Vehiculos/VehiculosDetails'))
const EstadosCiviles = React.lazy(() => import('./views/custom/EstadosCiviles/EstadosCiviles'))
const EstadosDetails = React.lazy(() => import('./views/custom/EstadosCiviles/EstadosCivilesDetails'))

const Clientes = React.lazy(() => import('./views/custom/Cliente/Cliente'))
const ClienteCreate = React.lazy(() => import('./views/custom/Cliente/ClienteCreate'))
const ClienteEdit = React.lazy(() => import('./views/custom/Cliente/ClienteEdit'))
const ClienteDetails = React.lazy(() => import('./views/custom/Cliente/ClienteDetails'))
const Usuarios = React.lazy(() => import('./views/custom/Usuarios/Usuarios'))
const UsuariosDetails = React.lazy(() => import('./views/custom/Usuarios/UsuariosDetails'))
const MetodosPagos = React.lazy(() => import('./views/custom/MetodosPagos/MetodosPagos'))
const MetodosPagosDetails = React.lazy(() => import('./views/custom/MetodosPagos/MetodosPagosDetails'))
const Compras = React.lazy(() => import('./views/custom/Compras/Compras'))
const CreateEmpleados = React.lazy(() => import('./views/custom/CreateEmpleados/CreateEmpleados'))
const EditEmpleados = React.lazy(() => import('./views/custom/Empleados/EditEmpleados'))
const DetailsEmpleados = React.lazy(() => import('./views/custom/Empleados/DetailsEmpleados'))

const Roles = React.lazy(() => import('./views/custom/roles/Roles'))
const RolesDetails = React.lazy(() => import('./views/custom/roles/RolesDetails'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/marcas', name: 'Marcas', element: Marcas },
  { path: '/marcasDetails', name: 'MarcasDetails', element: MarcasDetails },
  { path: '/modelos', name: 'Modelos', element: Modelos },
  { path: '/roles', name: 'Roles', element: Roles },
  { path: '/rolDetails', name: 'RolDetails', element: RolesDetails },
  { path: '/modelosDetails', name: 'Modelos', element: ModelosDetails },
  { path: '/sucursales', name: 'Sucursales', element: Sucursales },
  { path: '/sucursalesDetails', name: 'SucursalesDetails', element: SucursalesDetails },
  { path: '/EstadosDetails', name: 'EstadosDetails', element: EstadosDetails },
  { path: '/proveedores', name: 'Proveedores', element: Proveedores },
  { path: '/proveedoresDetails', name: 'ProveedoresDetails', element: ProveedoresDetails },
  { path: '/repuestos', name: 'Repuestos', element: Repuestos },
  { path: '/repuestosCreate', name: 'RepuestosCreate', element: RepuestosCreate },
  { path: '/repuestosEdit', name: 'RepuestosEdit', element: RepuestosEdit },
  { path: '/repuestosDetails', name: 'RepuestosDetails', element: RepuestosDetails },
  { path: '/servicios', name: 'Servicios', element: Servicios },
  { path: '/serviciosDetails', name: 'ServiciosDetails', element: serviciosDetails },
  { path: '/ventas', name: 'Ventas', element: Ventas },    
  { path: '/ventasCreate', name: 'VentasCreate', element: VentasCreate },    
  { path: '/ventasEdit', name: 'VentasEdit', element: VentasEdit },    
  { path: '/Empleados', name: 'Empleados', element: Empleados },
  { path: '/DetailsEmpleados', name: 'DetailsEmpleados', element: DetailsEmpleados },
  { path: '/Vehiculos', name: 'Vehiculos', element: Vehiculos },
  { path: '/VehiculosDetails', name: 'VehiculosDetails', element: VehiculosDetails },
  { path: '/EstadosCiviles', name: 'EstadosCiviles', element: EstadosCiviles },
  { path: '/Clientes', name: 'Clientes', element: Clientes },
  { path: '/ClienteCreate', name: 'ClienteCreate', element: ClienteCreate },
  { path: '/ClienteEdit', name: 'ClienteEdit', element: ClienteEdit },
  { path: '/ClienteDetails', name: 'ClienteDetails', element: ClienteDetails },
  { path: '/Usuarios', name: 'Usuarios', element: Usuarios },
  { path: '/UsuariosDetails', name: 'UsuariosDetails', element: UsuariosDetails },
  { path: '/MetodosPagos', name: 'MetodosPagos', element: MetodosPagos },
  { path: '/MetodosPagosDetails', name: 'MetodosPagosDetails', element: MetodosPagosDetails },
  { path: '/CreateEmpleados', name: 'CreateEmpleados', element: CreateEmpleados },
  { path: '/RegistrarEmpleados', name: 'RegistrarEmpleados', element: RegistrarEmpleados },
  { path: '/EditEmpleados', name: 'EditEmpleados', element: EditEmpleados },
  { path: '/Compras', name: 'Compras', element: Compras },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
