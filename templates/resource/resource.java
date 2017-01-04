package com.apple.iad.search.portal.campaign.api.resources.v1;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Component
@Path("v1/get")
public class <%= meta.name %> extends APIResourceBase {

	/**
	 * @type GET
	 * @description Get method
	 * @param {HttpServletRequest} req
	 * @return json
	 */
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response get<%= meta.componentName %>(@Context HttpServletRequest req) {
		// some code
	}

	/**
	 * @type PUT
	 * @description Put method
	 * @param {HttpServletRequest} req
	 * @return json
	 */
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response update<%= meta.componentName %>(@Context HttpServletRequest req) {
		// some code
	}

	/**
	 * @type POST
	 * @description Post method
	 * @param {HttpServletRequest} req
	 * @return json
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response create<%= meta.componentName %>() {
		// some code
	}

	/**
	 * @type DELETE
	 * @description Delete method
	 * @param {HttpServletRequest} req
	 * @return json
	 */
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete<%= meta.componentName %>(@Context HttpServletRequest req) {
		// some code
	}
}
