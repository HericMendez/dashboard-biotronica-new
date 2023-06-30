import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import is from 'is_js';
import MainLayout from './MainLayout';

import ErrorLayout from './ErrorLayout';
import WizardAuth from 'components/authentication/wizard/WizardAuth';

import Devices from 'components/biotronica/devices/device-list/Devices';
import DeviceDetails from 'components/biotronica/devices/device-details/DeviceDetails';

import Gateways from 'components/biotronica/gateways/gateway-list/Gateway-list';

import SplitLogin from 'components/authentication/split/Login';
import SplitLogout from 'components/authentication/split/Logout';
import SplitRegistration from 'components/authentication/split/Registration';
import SplitForgetPassword from 'components/authentication/split/ForgetPassword';
import SplitPasswordReset from 'components/authentication/split/PasswordReset';
import SplitConfirmMail from 'components/authentication/split/ConfirmMail';
import SplitLockScreen from 'components/authentication/split/LockScreen';
import Wizard from 'components/wizard/Wizard';
import Dashboard from 'components/dashboards/default';
import AppContext from 'context/Context';

import LayerComponent from 'components/doc-components/LayerComponent';

import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';

const Layout = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  const {
    config: { navbarPosition }
  } = useContext(AppContext);

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
    if (is.safari()) {
      HTMLClassList.add('safari');
    }
  }, [HTMLClassList]);

  useEffect(() => {
    if (navbarPosition === 'double-top') {
      HTMLClassList.add('double-top-nav-layout');
    }
    return () => HTMLClassList.remove('double-top-nav-layout');
  }, [navbarPosition]);

  return (
    <>
      <Routes>
        <Route element={<ErrorLayout />}>
          <Route path="errors/404" element={<Error404 />} />
          <Route path="errors/500" element={<Error500 />} />
        </Route>

        {/*- ------------- Split ---------------------------  */}

        <Route path="/login" element={<SplitLogin />} />
        <Route path="/logout" element={<SplitLogout />} />
        <Route path="/register" element={<SplitRegistration />} />
        <Route path="/forgot-password" element={<SplitForgetPassword />} />
        <Route path="/reset-password" element={<SplitPasswordReset />} />
        <Route path="/confirm-mail" element={<SplitConfirmMail />} />
        <Route path="/lock-screen" element={<SplitLockScreen />} />

        <Route element={<WizardAuth />}>
          <Route
            path="authentication/wizard"
            element={<Wizard validation={true} />}
          />
        </Route>

        {/* //--- MainLayout Starts  */}

        <Route element={<MainLayout />}>
          {/*Dashboard*/}
          <Route path="/" element={<Dashboard />} />

          <Route path="maps/leaflet-map" element={<LayerComponent />} />

          {/*App*/}

          {/*e-commerce */}

          <Route
            path="/device/:mac_address"
            //'components/biotronica/devices/device-details/DeviceDetails';
            element={<DeviceDetails />}
          />
          <Route path="/gateways" element={<Gateways />} />

          <Route path="/devices" element={<Devices />} />
          <Route path="/gateway_devices/:mac_address" element={<Devices />} />

          {/* charts-example */}

          {/*Components*/}
          {/* <Route path="components/alerts" element={<Alerts />} />
          <Route path="components/accordion" element={<Accordion />} />
          <Route path="components/animated-icons" element={<AnimatedIcons />} />
          <Route path="components/badges" element={<Badges />} />
          <Route path="components/breadcrumb" element={<Breadcrumbs />} />
          <Route path="components/buttons" element={<Buttons />} />
          <Route path="components/calendar" element={<CalendarExample />} />
          <Route path="components/cards" element={<Cards />} />
          <Route path="components/dropdowns" element={<Dropdowns />} />
          <Route path="components/list-group" element={<ListGroups />} />
          <Route path="components/modals" element={<Modals />} />
          <Route path="components/offcanvas" element={<Offcanvas />} />
          <Route path="components/pagination" element={<Pagination />} />
          <Route
            path="components/progress-bar"
            element={<BasicProgressBar />}
          />
          <Route path="components/placeholder" element={<Placeholder />} />
          <Route path="components/spinners" element={<Spinners />} />
          <Route path="components/toasts" element={<Toasts />} />
          <Route path="components/pictures/avatar" element={<Avatar />} />
          <Route path="components/pictures/images" element={<Image />} />
          <Route path="components/pictures/figures" element={<Figures />} />
          <Route path="components/pictures/hoverbox" element={<Hoverbox />} />
          <Route path="components/pictures/lightbox" element={<Lightbox />} />
          <Route path="components/tooltips" element={<Tooltips />} />
          <Route path="components/popovers" element={<Popovers />} />
          <Route path="components/draggable" element={<DraggableExample />} />
          <Route path="components/scrollspy" element={<Scrollspy />} />
          <Route path="components/timeline" element={<Timeline />} />
          <Route path="components/treeview" element={<TreeviewExample />} />
          <Route
            path="components/carousel/bootstrap"
            element={<BootstrapCarousel />}
          />
          <Route path="components/carousel/slick" element={<SlickCarousel />} />
          <Route path="components/navs-and-tabs/navs" element={<Navs />} />
          <Route path="tables/basic-tables" element={<Tables />} />
          <Route
            path="tables/advance-tables"
            element={<AdvanceTableExamples />}
          />
          <Route path="forms/basic/form-control" element={<FormControl />} />
          <Route path="forms/basic/input-group" element={<InputGroup />} />
          <Route path="forms/basic/select" element={<Select />} />
          <Route path="forms/basic/checks" element={<Checks />} />
          <Route path="forms/basic/range" element={<Range />} />
          <Route path="forms/basic/layout" element={<FormLayout />} />
          <Route path="forms/advance/date-picker" element={<DatePicker />} />
          <Route path="forms/advance/editor" element={<Editor />} />
          <Route
            path="forms/advance/emoji-button"
            element={<EmojiMartExample />}
          />
          <Route
            path="forms/advance/advance-select"
            element={<AdvanceSelect />}
          />
          <Route
            path="forms/advance/file-uploader"
            element={<FileUploader />}
          />
          <Route path="forms/advance/rating" element={<Rating />} />
          <Route path="forms/floating-labels" element={<FloatingLabels />} />
          <Route path="forms/validation" element={<FormValidation />} />
          <Route path="forms/wizard" element={<WizardForms />} />
          <Route path="components/navs-and-tabs/navbar" element={<Navbars />} />
          <Route path="components/navs-and-tabs/tabs" element={<Tabs />} />
          <Route path="components/collapse" element={<Collapse />} />
          <Route
            path="components/cookie-notice"
            element={<CookieNoticeExample />}
          />
          <Route path="components/countup" element={<CountUp />} />
          <Route path="components/videos/embed" element={<Embed />} />
          <Route
            path="components/videos/react-player"
            element={<ReactPlayerExample />}
          />
          <Route path="components/background" element={<Background />} />
          <Route path="components/search" element={<Search />} />
          <Route path="components/typed-text" element={<TypedText />} />
          <Route
            path="components/navs-and-tabs/vertical-navbar"
            element={<VerticalNavbar />}
          />
          <Route
            path="components/navs-and-tabs/top-navbar"
            element={<NavBarTop />}
          />
          <Route
            path="components/navs-and-tabs/double-top-navbar"
            element={<NavbarDoubleTop />}
          />
          <Route
            path="components/navs-and-tabs/combo-navbar"
            element={<ComboNavbar />}
          /> */}

          {/*Utilities*/}
          {/*  <Route path="utilities/borders" element={<Borders />} />
          <Route path="utilities/colors" element={<Colors />} />
          <Route path="utilities/colored-links" element={<ColoredLinks />} />
          <Route path="utilities/display" element={<Display />} />
          <Route path="utilities/visibility" element={<Visibility />} />
          <Route path="utilities/stretched-link" element={<StretchedLink />} />
          <Route path="utilities/stretched-link" element={<StretchedLink />} />
          <Route path="utilities/float" element={<Float />} />
          <Route path="utilities/position" element={<Position />} />
          <Route path="utilities/spacing" element={<Spacing />} />
          <Route path="utilities/sizing" element={<Sizing />} />
          <Route
            path="utilities/text-truncation"
            element={<TextTruncation />}
          />
          <Route path="utilities/typography" element={<Typography />} />
          <Route path="utilities/vertical-align" element={<VerticalAlign />} />
          <Route path="utilities/flex" element={<Flex />} />
          <Route path="utilities/grid" element={<Grid />} />
          <Route path="utilities/scroll-bar" element={<Scrollbar />} /> */}
        </Route>

        {/* //--- MainLayout end  */}

        {/* <Navigate to="/errors/404" /> */}
        <Route path="*" element={<Navigate to="/errors/404" replace />} />
      </Routes>
      {/* <SettingsToggle />
      <SettingsPanel />
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.BOTTOM_LEFT}
      /> */}
    </>
  );
};

export default Layout;
