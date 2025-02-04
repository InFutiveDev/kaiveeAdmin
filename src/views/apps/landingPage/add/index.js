import { memo, useState, Fragment, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Label,
  Spinner,
} from "reactstrap";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CheckObjectValidation } from "../../../../utility/Utils";
import { ADD_LANDING_ADMIN } from "../../../../redux/actions/ladningPage";
import EditorCom from "../../../../@core/components/editor";

const AddHabit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [errorKeyName, setErrorKeyName] = useState("");
  const [payload, setPayload] = useState({
    // landingPageSource: "",
    title: "",
    landingPageArticle: "",
    leads_source: "",
    mobile_landing: "",
    // testArticle: "",
    phone: "",
    // metaTagTitle: "",
    // metaTagDescription: "",
    // metaTagKeywords: "",
    url: "",
    landing_page_model: "",
    landingpageimage: "",
    landingPageStatus: "",
    addTest: null,
    // testDescription: "",
    contentimage: "",
    landingpageimage_altTag: "",
    contentimage_altTag: "",
  });
  const getContent = (htmlContentProp, name) => {
    setPayload({ ...payload, [name]: htmlContentProp });
  };

  const handleFiles = async (e) => {
    const { name, files } = e.target;
    const imageUrl = URL.createObjectURL(files[0]);
    if (name === "contentimage") {
      setPayload({ ...payload, [name]: files[0], content_image_url: imageUrl });
    } else {
      setPayload({ ...payload, [name]: files[0], image_url: imageUrl });
    }
  };

  const hanleInputBase = (e) => {
    const { name, value } = e.target;
    if (errorKeyName === name) {
      setErrorKeyName("");
    }
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async () => {
    delete payload.image_url;
    delete payload.content_image_url;
    // delete payload.landingpageimage;
    const checkValidation = CheckObjectValidation(payload, [
      "testDescription",
      "name",
      "bannerContant",
      "addTest",
      "testArticle",
      "landingPageSource",
      "testInfo",
      "metaTagTitle",
      "metaTagDescription",
      "metaTagKeywords",
      "leads_source",
      "contentimage_altTag",
      "landingpageimage_altTag",
      "mobile_landing",
    ]);
    setErrorKeyName(checkValidation.keyname);
    if (checkValidation.isvalid) {
      setLoading(true);
      const res = await dispatch(ADD_LANDING_ADMIN(payload));
      if (res?.success) {
        history.push("/apps/landing-page/all");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="w-100">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <h4>Add Landing Page</h4>
            <Button.Ripple
              onClick={() => {
                history.goBack();
              }}
              color="primary"
              outline
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Button.Ripple>
          </div>
        </CardHeader>

        <CardBody>
          <Row>
            {/* <Col md="6" sm="12">
              <FormGroup>
                <Label for="title">
                  name
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter name"
                  value={payload?.name}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "name" ? (
                  <span className="text-danger">Name is Required</span>
                ) : null}
              </FormGroup>
            </Col> */}
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="image">
                  Landing page banner
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="file"
                  name="landingpageimage"
                  id="landingpageimage"
                  placeholder="Landing page banner"
                  onChange={handleFiles}
                />
                {payload.landingpageimage ? (
                  <div>
                    <span>Image Preview: </span>
                    <img
                      src={payload?.image_url}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                ) : null}
                {errorKeyName === "landingpageimage" ? (
                  <span className="text-danger">
                    Landing Page Banner is Required
                  </span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="title"> Landing page banner alt tag</Label>
                <Input
                  type="text"
                  name="landingpageimage_altTag"
                  id="landingpageimage_altTag"
                  placeholder="Enter Landing page banner alt tag"
                  value={payload?.landingpageimage_altTag}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="image">
                  Content image
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="file"
                  name="contentimage"
                  id="contentimage"
                  placeholder="Landing page banner"
                  onChange={handleFiles}
                />
                {payload.contentimage ? (
                  <div>
                    <span>Image Preview: </span>
                    <img
                      src={payload?.content_image_url}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>
                ) : null}
                {errorKeyName === "contentimage" ? (
                  <span className="text-danger">Content image is Required</span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="title"> Content image alt tag</Label>
                <Input
                  type="text"
                  name="contentimage_altTag"
                  id="contentimage_altTag"
                  placeholder="Enter Content image alt tag"
                  value={payload?.contentimage_altTag}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              {/*  <FormGroup>
                <Label for="title">
                  Banner Contant{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="bannerContant"
                  id="bannerContant"
                  placeholder="Enter Banner Contant"
                  value={payload?.bannerContant}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "bannerContant" ? (
                  <span className="text-danger">
                    Banner Contant is Required
                  </span>
                ) : null}
              </FormGroup>*/}
              <FormGroup>
                <Label for="title">
                  title
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter Title"
                  value={payload?.title}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "title" ? (
                  <span className="text-danger">Title is Required</span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="title">
                  Landing Page Article{" "}
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <EditorCom getContent={getContent} name="landingPageArticle" />

                {/* <Input
                  type="text"
                  name="landingPageArticle"
                  id="landingPageArticle"
                  placeholder="Enter Landing Page Article"
                  value={payload?.landingPageArticle}
                  onChange={hanleInputBase}
                /> */}
                {errorKeyName === "landingPageArticle" ? (
                  <span className="text-danger">
                    Landing Page Article is Required
                  </span>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="title">
                  Phone Number
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  maxLength={11}
                  name="phone"
                  id="phone"
                  placeholder="Enter Phone Number"
                  value={payload?.phone}
                  onChange={(e) => {
                    if (/^[0-9\s]*$/.test(e.target?.value)) {
                      hanleInputBase(e);
                    }
                  }}
                />
                {errorKeyName === "phone" ? (
                  <span className="text-danger">Phone Number is Required</span>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="title">Mobile Landing</Label>
                <Input
                  type="text"
                  maxLength={11}
                  name="mobile_landing"
                  id="mobile_landing"
                  placeholder="Enter Mobile Landing Number"
                  value={payload?.mobile_landing}
                  onChange={(e) => {
                    if (/^[0-9\s]*$/.test(e.target?.value)) {
                      hanleInputBase(e);
                    }
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">
                  Url
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="text"
                  name="url"
                  id="url"
                  placeholder="Enter Url"
                  value={payload?.url}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "url" ? (
                  <span className="text-danger">Url is Required</span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="title">
                  landingPageStatus
                  <span className="text-danger">
                    <sup>
                      <b>*</b>
                    </sup>
                  </span>
                </Label>
                <Input
                  type="select"
                  name="landingPageStatus"
                  id="landingPageStatus"
                  value={payload?.landingPageStatus}
                  onChange={hanleInputBase}
                >
                  <option>select status</option>
                  <option value={"Active"}>Active</option>
                  <option value={"Inactive"}>Inactive</option>
                </Input>

                {errorKeyName === "landingPageStatus" ? (
                  <span className="text-danger">
                    landingPageStatus is Required
                  </span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <FormGroup className="mt-2">
                <Label for="Article">
                  Article <span className="text-danger"></span>
                </Label>
                <EditorCom getContent={getContent} name="testArticle" />
              </FormGroup>
            </Col>
            {/* <Col md="12" sm="12">
              <FormGroup>
                <Label for="title">
                  Landing Page Source
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="landingPageSource"
                  id="landingPageSource"
                  placeholder="Enter Landing PageSource"
                  value={payload?.landingPageSource}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col> */}
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="title">
                  Landing page model
                  <span className="text-danger">*</span>
                </Label>
                <Input
                  type="select"
                  name="landing_page_model"
                  id="landing_page_model"
                  value={payload?.landing_page_model}
                  onChange={hanleInputBase}
                >
                  <option value="">Select Landing Page</option>

                  <option value="1">landing page 1</option>
                  <option value="2">landing page 2</option>
                </Input>
                {errorKeyName === "landing_page_model" ? (
                  <span className="text-danger">
                    La nding page model is Required
                  </span>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="title">
                  Leads Source
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="leads_source"
                  id="leads_source"
                  placeholder="Enter Leads Source"
                  value={payload?.leads_source}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            {/* <Col md="12" sm="12"> */}
            {/* <FormGroup>
                <Label for="title">
                  Test Description
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="testDescription"
                  id="testDescription"
                  placeholder="Enter Test Description"
                  value={payload?.testDescription}
                  onChange={hanleInputBase}
                />
              </FormGroup> */}
            {/* <FormGroup>
                <Label for="title">
                  addTest
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="addTest"
                  id="addTest"
                  placeholder="Enter addTest"
                  value={payload?.addTest}
                  onChange={hanleInputBase}
                />
                {errorKeyName === "addTest" ? (
                  <span className="text-danger">Add Test is Required</span>
                ) : null}
              </FormGroup> */}
            {/* </Col> */}
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="metatagtile">
                  Meta Tag Title
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="metaTagTitle"
                  id="metaTagTitle"
                  placeholder="Enter Meta Title"
                  value={payload?.metaTagTitle}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label for="metatagdescription">
                  Meta Tag Description
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="metaTagDescription"
                  id="metaTagDescription"
                  placeholder="Enter Meta Description"
                  value={payload?.metaTagDescription}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col md="12" sm="12">
              <FormGroup>
                <Label>
                  Meta Tag Keywords
                  <span className="text-danger"></span>
                </Label>
                <Input
                  type="text"
                  name="metaTagKeywords"
                  id="metaTagKeywords"
                  placeholder="Enter Meta Keywords"
                  value={payload?.metaTagKeywords}
                  onChange={hanleInputBase}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup className="d-flex mb-0">
                <Button
                  type="submit"
                  disabled={loading}
                  className="mr-1"
                  color="primary"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <Fragment>
                      <Spinner size="sm" />
                      <span className="ml-50">Loading...</span>
                    </Fragment>
                  ) : (
                    <span>Add Landing Page</span>
                  )}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
export default memo(AddHabit);
