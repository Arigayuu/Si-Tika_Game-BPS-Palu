import React from "react";
import { applyDesignRules } from "./applyDesignRules.jsx";
const assetPathPrefix = "/assets";
const imgMaskotBurungHantuCeriaBersemangat1 = `${assetPathPrefix}/d6738.png`;
const imgVectorWhite = `${assetPathPrefix}/b390d.svg`;
const imgStatusIcons = `${assetPathPrefix}/8e787.svg`;
const imgGroup172 = `${assetPathPrefix}/2cbac.svg`;
const imgGroup141 = `${assetPathPrefix}/dfe5f.svg`;
const imgRectangle145 = `${assetPathPrefix}/d8410.svg`;
const imgRectangle147 = `${assetPathPrefix}/41fe4.svg`;
const imgRectangle144 = `${assetPathPrefix}/60cff.svg`;
const imgGroup139 = `${assetPathPrefix}/1204f.svg`;
const imgRectangle15 = `${assetPathPrefix}/556c1.svg`;
const imgEllipse3 = `${assetPathPrefix}/aba23.svg`;

export default function WinnerDesign({rules={}}) {
  return applyDesignRules((
    <div className="d0" data-node-id="2016:4379" data-name="winner page">
      <div className="d162" data-node-id="2016:4380">
        <div className="d163">
          <div className="d164" data-name="Vector  White">
            <img alt="" className="d19" src={imgVectorWhite} />
          </div>
        </div>
      </div>
      <div className="d181" data-node-id="2016:4824">
        <div className="d182">
          <div className="d183" data-name="Maskot Burung Hantu Ceria Bersemangat 1">
            <img alt="" className="d33" src={imgMaskotBurungHantuCeriaBersemangat1} />
          </div>
        </div>
      </div>
      <div className="d23" data-node-id="2016:4381" data-name="IOS iPhone / Status Bar â€” with phone notch">
        <div className="d24" data-node-id="2016:4382" data-name="Time">
          <div className="d165" data-node-id="2016:4383">
            <p className="d26">09:41</p>
          </div>
        </div>
        <div className="d27" data-node-id="2016:4384" data-name="Status Icons">
          <img alt="" className="d19" src={imgStatusIcons} />
        </div>
      </div>
      <div className="d166" data-node-id="2016:4702">
        <img alt="" className="d19" src={imgGroup172} />
      </div>
      <div className="d184" data-node-id="2016:4344">
        <div className="d185" data-node-id="2016:4345" />
        <div className="d186" data-node-id="2016:4346">
          <div className="d187">
            <div className="d188">
              <p className="d26">Selamat kamu lanjut ke level selanjutnya</p>
            </div>
          </div>
        </div>
        <div className="d189" data-node-id="2016:4347">
          <div className="d190" data-node-id="2016:4348">
            <img alt="" className="d19" src={imgGroup141} />
          </div>
          <div className="d191" data-node-id="2016:4355">
            <div className="d192">
              <div className="d193">
                <div className="d194">
                  <img alt="" className="d5" src={imgRectangle145} />
                </div>
              </div>
            </div>
          </div>
          <div className="d195" data-node-id="2016:4356">
            <div className="d196">
              <div className="d193">
                <div className="d194">
                  <img alt="" className="d5" src={imgRectangle147} />
                </div>
              </div>
            </div>
          </div>
          <div className="d197" data-node-id="2016:4357">
            <div className="d198" data-node-id="2016:4358">
              <div className="d199">
                <img alt="" className="d5" src={imgRectangle144} />
              </div>
            </div>
            <div className="d200" data-node-id="2016:4359">
              <p className="d201" data-node-id="2016:4360">
                Level 1
              </p>
              <div className="d202" data-node-id="2016:4361">
                <p className="d26">COMPLETE</p>
              </div>
            </div>
            <div className="d203" data-node-id="2016:4362">
              <img alt="" className="d19" src={imgGroup139} />
            </div>
          </div>
        </div>
        <div className="d204" data-node-id="2016:4371">
          <div className="d205" data-node-id="2016:4372" />
          <div className="d206" data-node-id="2016:4373" />
          <div className="d207" data-node-id="2016:4374">
            <div className="d208">
              <img alt="" className="d5" src={imgRectangle15} />
            </div>
          </div>
          <div className="d209" data-node-id="2016:4375">
            <p className="d26">next level</p>
          </div>
          <div className="d210" data-node-id="2016:4376">
            <div className="d211">
              <div className="d212">
                <img alt="" className="d19" src={imgEllipse3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),rules);
}
