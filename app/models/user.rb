class User < ApplicationRecord
  DEFAULT_ORDER = {updated_at: :desc, name: :desc, email: :desc, title: :desc, phone: :desc, active: :desc, created_at: :desc}
  QUERY_FIELDS = %w(name email phone title)

  belongs_to :account, inverse_of: :users
  validates_uniqueness_of :email, scope: :account_id
  validates_presence_of :email, :name, :phone

  def self.search(params)
    search = []

    if params[:q].present?
      QUERY_FIELDS.each do |field|
        search << "#{field} ILIKE '%#{params[:q]}%'"
      end
    end

    query_string = search.join(" OR ")
    self.where(query_string).order(self.order_string(params[:sort_attr], params[:sort_dir]))
  end

  def self.order_string(new_attr, new_dir)
    new_attr = new_attr.present? ? new_attr.to_sym : nil

    if new_attr.present? && new_dir.present? && DEFAULT_ORDER.keys.include?(new_attr) && ['desc', 'asc'].include?(new_dir)
      order_hash = DEFAULT_ORDER.dup
      order_hash.delete(new_attr)
      order_hash.reverse_merge({new_attr => new_dir})
    else
      DEFAULT_ORDER
    end
  end

  def created_at_formatted
    Time.at(self[:created_at]).strftime("%m/%d/%Y %r")
  end

  def updated_at_formatted
    Time.at(self[:updated_at]).strftime("%m/%d/%Y %r")
  end

end
