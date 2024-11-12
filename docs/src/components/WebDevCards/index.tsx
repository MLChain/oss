/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"

const WebDevCards = [
  {
    name: "Community Support",
    url: {
      page: "https://discord.gg/mlchain",
      name: "Go to our Discord Server"
    },
    description:
      "An active community of builders helping each other succeed with Mlchain"
  },
  {
    name: "v12 Open Source",
    url: {
      page: "https://github.com/mlchain/oss/",
      name: "Go to GitHub Repository"
    },
    description:
      "Install our latest Mlchain v12 open source code on your machine"
  },
  {
    name: "Learning Center",
    url: {
      page: "https://learn.mlchain.com/",
      name: "Go to Mlchain Learning Center"
    },
    description:
      "Understand the fundamental Mlchain concepts to become an excellent chatbot developer"
  },
  {
    name: "Blog",
    url: {
      page: "https://mlchain.com/blog",
      name: "Go to Mlchain Blogs"
    },
    description:
      "Essays, opinions, & advice about the Conversational AI space from Mlchain"
  },

  {
    name: "Youtube Channel",
    url: {
      page: "https://www.youtube.com/c/Mlchain",
      name: "Go to Mlchain Youtube Channel"
    },
    description:
      "Curated content for building better chatbots with Mlchain on our Youtube Channel"
  }
]

interface Props {
  name: string
  image: string
  url: {
    page?: string
    codepen?: string
  }
  description: JSX.Element
}

function WebDevCard({ name, url, description }: Props) {
  return (
    <div className="col col--6 margin-bottom--lg">
      <div className={clsx("card")}>
        <div className="card__body">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            <Link to={url.page}>{url.name}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function WebDevCardSingle({ name, url, description }: Props) {
  return (
    <div className="col col--12 margin-bottom--lg">
      <div className={clsx("card")}>
        <div className="card__body">
          <h3 style={{ textAlign: "center" }}>
            Download Mlchain v12 Binaries
          </h3>
          <p style={{ textAlign: "center" }}>
            For enterprise customers or individuals looking to deploy Mlchain
            on their own infrastructure.
            <br />
            By downloading, you agree to our{" "}
            <a href="https://mlchain.com/privacy">privacy policy</a> and{" "}
            <a href="https://mlchain.com/company/terms">terms of service</a>.
          </p>
        </div>
        <div className="card__footer">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="row">
              <div className="button-group button-group--block padding-horiz--md">
                <Link to="https://s3.amazonaws.com/mlchain-binaries/mlchain-v12_30_6-darwin-x64.zip">
                  Mac
                </Link>
              </div>
              <div className="button-group button-group--block padding-horiz--md">
                <Link to="https://s3.amazonaws.com/mlchain-binaries/mlchain-v12_30_6-win-x64.zip">
                  Windows
                </Link>
              </div>
              <div className="button-group button-group--block padding-horiz--md">
                <Link to="https://s3.amazonaws.com/mlchain-binaries/mlchain-v12_30_6-linux-x64.zip">
                  Linux
                </Link>
              </div>
              <div className="button-group button-group--block padding-horiz--md">
                <Link to="https://hub.docker.com/r/mlchain/server">
                  Docker Image
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WebDevCardsRow(): JSX.Element {
  return (
    <div className="row">
      <WebDevCardSingle />
      {WebDevCards.map(special => (
        <WebDevCard key={special.name} {...special} />
      ))}
    </div>
  )
}
